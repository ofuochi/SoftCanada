"use client";

import { PlusCircleFilled } from "@ant-design/icons";
import { Collapse, CollapseProps, theme } from "antd";
import { CSSProperties, useMemo } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Faq as FaqType, FaqFaqs } from "@/tina/__generated__/types";

interface FaqAccordionProps {
  faqs?: FaqType['faqs'] | null;
  searchTerm?: string;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs, searchTerm }) => {
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const allItems: CollapseProps["items"] = useMemo(() => {
    if (!faqs) return [];
    return faqs.map((faqItem, index) => {
      if (!faqItem) return null; // Should be filtered by parent, but good practice
      return {
        key: faqItem.question || `faq-${index}`, // Use question as key or fallback
        label: faqItem.question,
        children: faqItem.answer ? <TinaMarkdown content={faqItem.answer} /> : <p>No answer provided.</p>,
        style: panelStyle,
      };
    }).filter(Boolean) as CollapseProps["items"]; // Filter out any nulls
  }, [faqs, panelStyle]);


  const filteredItems = useMemo(() => {
    if (!searchTerm) return allItems;
    const searchLower = searchTerm.toLowerCase();
    return allItems?.filter((item) => {
      if (!item) return false;
      const labelMatch = (item.label as string)
        ?.toLowerCase()
        ?.includes(searchLower);
      
      // For children, we need to check the raw content if possible,
      // or stringify the React element which is not ideal for search.
      // For now, searching only by label.
      // A more robust search would involve having raw text from TinaMarkdown content.
      // const childrenText = item.children // This is a ReactNode
      // For simplicity, we'll only filter by question (label)
      return labelMatch;
    });
  }, [allItems, searchTerm]);

  return (
    <Collapse
      accordion
      bordered={false}
      items={filteredItems}
      className="mt-[73px]" // This class was here, assuming it's from original styling
      expandIconPosition="end"
      style={{ background: token.colorBgContainer }}
      expandIcon={({ isActive }) =>
        isActive ? (
          <PlusCircleFilled
            style={{
              color: token.colorTextHeading,
              fontSize: 20,
              transform: "rotate(45deg)",
            }}
          />
        ) : (
          <PlusCircleFilled
            style={{
              color: token.colorTextHeading,
              fontSize: 20,
            }}
          />
        )
      }
    />
  );
};

export default FaqAccordion;
