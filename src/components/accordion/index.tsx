import React from 'react';
import { Accordion as ShadcnAccordion } from '@/components/ui/accordion';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';

type Props = {
  trigger: string;
  content: string;
};

const Accordion = ({ trigger, content }: Props) => {
  return (
    <ShadcnAccordion type="single" collapsible>
      <AccordionItem>
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </ShadcnAccordion>
  );
};

export default Accordion;
