"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { Mail, User, MessageSquare } from "react-feather";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Replace the toast usage in ContactModal.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Thank you for contacting us. We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to send message. Please try again later." + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="py-2 text-sm text-start font-medium transition-colors text-muted-foreground hover:text-primary cursor-pointer flex items-center gap-2">
          <Mail className="h-4 w-4 md:hidden" />
          Contact
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get in Touch</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground/80">
              <User className="h-4 w-4" />
              <label htmlFor="name">Name</label>
            </div>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground/80">
              <Mail className="h-4 w-4" />
              <label htmlFor="email">Email</label>
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground/80">
              <MessageSquare className="h-4 w-4" />
              <label htmlFor="message">Message</label>
            </div>
            <Textarea
              id="message"
              name="message"
              placeholder="Your message here..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
