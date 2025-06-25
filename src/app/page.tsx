import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  return (
   <div className="max-w-md mx-auto mt-10">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Account Info</AccordionTrigger>
          <AccordionContent>
            This section contains your account info.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Settings</AccordionTrigger>
          <AccordionContent>
            Here you can update your preferences.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
