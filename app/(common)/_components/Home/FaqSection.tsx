import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How do I list my property on RentNest?",
        answer:
            "Create a landlord account, go to your dashboard, and click \"Add Property.\" Fill in the details — photos, price, location, amenities — and your listing goes live once submitted.",
    },
    {
        question: "How do rental requests work?",
        answer:
            "Tenants browse listings and submit a rental request for properties they're interested in. Landlords review requests from their dashboard and can approve or decline them directly.",
    },
    {
        question: "Is payment handled through RentNest?",
        answer:
            "Yes. Payments are processed securely through Stripe, so rent and fees are tracked in one place without needing to exchange bank details manually.",
    },
    {
        question: "Can I cancel or update a rental request?",
        answer:
            "Yes, tenants can update or withdraw a pending request from their dashboard before it's approved by the landlord.",
    },
    {
        question: "Is there a fee to use RentNest?",
        answer:
            "Browsing and creating an account is free. Any applicable service fees are shown clearly before you confirm a payment or booking.",
    },
    {
        question: "How do I contact a landlord or tenant?",
        answer:
            "Once a rental request is approved, contact details are shared so both parties can coordinate move-in and other details directly.",
    },
]

export default function FaqSection() {
    return (
        <section className="w-10/12 mx-auto py-16">
            <div className="text-center mb-10">
                <h2 className="text-2xl font-semibold text-foreground">
                    Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground mt-1">
                    Everything you need to know before getting started
                </p>
            </div>

            <div className="">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-base">
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
    )
}