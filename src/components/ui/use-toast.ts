import { toast as sonnerToast } from "sonner";

export function useToast() {
  return {
    toast: (props: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      const { title, description, variant } = props;

      if (variant === "destructive") {
        return sonnerToast.error(title || "Error", {
          description,
        });
      }

      return sonnerToast.success(title || "Success", {
        description,
      });
    },
  };
}

export { sonnerToast as toast };
