"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Share2,
  Copy,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
} from "react-feather";
import { useToast } from "@/components/ui/use-toast";

interface ShareDialogProps {
  title: string;
  description: string;
  url: string;
  trigger?: React.ReactNode;
}

export default function ShareDialog({
  title,
  description,
  url,
  trigger,
}: ShareDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Blog link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent(`${description}\n\nRead more: ${url}`)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const shareButtons = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-blue-50 hover:text-blue-600",
      onClick: () => handleShare("twitter"),
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-blue-50 hover:text-blue-600",
      onClick: () => handleShare("facebook"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "hover:bg-blue-50 hover:text-blue-600",
      onClick: () => handleShare("linkedin"),
    },
    {
      name: "Email",
      icon: Mail,
      color: "hover:bg-green-50 hover:text-green-600",
      onClick: () => handleShare("email"),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this blog</DialogTitle>
          <DialogDescription>
            Share "{title}" with your friends and colleagues
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Copy Link Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Blog URL</label>
            <div className="flex gap-2">
              <Input
                value={url}
                readOnly
                className="flex-1"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share on social media</label>
            <div className="grid grid-cols-2 gap-2">
              {shareButtons.map((button) => (
                <Button
                  key={button.name}
                  variant="outline"
                  className={`justify-start gap-2 ${button.color}`}
                  onClick={button.onClick}
                >
                  <button.icon className="w-4 h-4" />
                  {button.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Native Share (if available) */}
          {navigator.share && (
            <div className="pt-2">
              <Button
                onClick={() => {
                  navigator
                    .share({
                      title,
                      text: description,
                      url,
                    })
                    .catch(() => {
                      toast({
                        title: "Share failed",
                        description: "Couldn't share the post",
                        variant: "destructive",
                      });
                    });
                  setIsOpen(false);
                }}
                className="w-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share via system
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
