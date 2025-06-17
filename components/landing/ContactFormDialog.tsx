
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, buttonVariants } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { Mail, Send, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required.' }).max(50, {message: 'First name is too long.'}),
  lastName: z.string().min(1, { message: 'Last name is required.' }).max(50, {message: 'Last name is too long.'}),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(1000, {message: 'Message is too long.'}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormDialogProps {
  triggerLabel?: string;
  triggerClassName?: string;
}

const ContactFormDialog: React.FC<ContactFormDialogProps> = ({
  triggerLabel = "Contact Us",
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        message: '',
    }
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // If the API returned an error (e.g., 400, 500), use its message
        throw new Error(result.message || 'Something went wrong with the submission.');
      }

      toast({
        title: 'Message Sent!',
        description: result.message || "Your message has been submitted. We'll get back to you soon via buskstation@gmail.com.",
        variant: 'default',
      });
      reset();
      setIsOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        title: 'Error Sending Message',
        description: errorMessage || 'Could not submit your message. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open && !isSubmitting) { 
        reset();
      }
    }}>
      <DialogTrigger asChild>
        <button
          className={cn(
            buttonVariants({ size: 'lg' }),
            'h-14 text-lg rounded-2xl px-8 transition-transform hover:scale-105',
            'bg-foreground text-background hover:bg-foreground/90',
            triggerClassName
          )}
          aria-label={triggerLabel}
        >
          <Mail className="mr-2 h-5 w-5" />
          {triggerLabel}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-card/30 backdrop-blur-xl border-border/20 shadow-xl rounded-2xl">
        <DialogHeader className="pt-2">
          <DialogTitle className="font-headline text-2xl text-primary">Get in Touch</DialogTitle>
          <DialogDescription className="text-foreground/80">
            We&apos;d love to hear from you! Send us your questions or suggestions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-foreground/90 font-medium">First Name</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                className="bg-background/50 border-input focus:ring-primary focus:border-primary rounded-lg"
                placeholder="Your first name"
                disabled={isSubmitting}
              />
              {errors.firstName && <p className="text-sm text-destructive pt-1">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-foreground/90 font-medium">Last Name</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                className="bg-background/50 border-input focus:ring-primary focus:border-primary rounded-lg"
                placeholder="Your last name"
                disabled={isSubmitting}
              />
              {errors.lastName && <p className="text-sm text-destructive pt-1">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-foreground/90 font-medium">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className="bg-background/50 border-input focus:ring-primary focus:border-primary rounded-lg"
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-sm text-destructive pt-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="message" className="text-foreground/90 font-medium">Message</Label>
            <Textarea
              id="message"
              {...register('message')}
              className="bg-background/50 border-input focus:ring-primary focus:border-primary rounded-lg min-h-[120px]"
              placeholder="Let us know what's on your mind..."
              disabled={isSubmitting}
            />
            {errors.message && <p className="text-sm text-destructive pt-1">{errors.message.message}</p>}
          </div>
          <DialogFooter className="sm:justify-end pt-2 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="rounded-lg border-border hover:bg-muted text-foreground" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting} className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
