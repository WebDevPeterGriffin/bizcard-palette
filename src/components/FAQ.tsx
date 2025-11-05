import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is a digital business card?",
      answer: "A digital business card is an online version of a traditional paper business card that can be easily shared via QR code, email, or link. It's always up-to-date and more environmentally friendly."
    },
    {
      question: "Can I update my card information after creation?",
      answer: "Yes! You can update your headshot and booking settings anytime. For other changes, contact support or create a new card."
    },
    {
      question: "How do I share my digital business card?",
      answer: "You can share your card via a custom URL, QR code, email, or social media. Recipients can save your contact information directly to their phone with one tap."
    },
    {
      question: "Do my contacts need an app to view my card?",
      answer: "No! Your digital business card works on any device with a web browser - no app downloads required."
    },
    {
      question: "Can I choose my own URL?",
      answer: "Yes! Your card URL is based on your name and can be customized during the creation process."
    },
    {
      question: "What social media platforms are supported?",
      answer: "We support all major platforms including LinkedIn, Twitter, Instagram, Facebook, GitHub, and many more."
    }
  ];

  return (
    <section className="px-4 py-16 bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
