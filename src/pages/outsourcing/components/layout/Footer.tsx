import React from "react";
import { NavigationPage } from "../../types";
import { GlobalFooter } from "../../../../components/GlobalFooter";

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenLeadModal: (service?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  return (
    <GlobalFooter
      onNavigate={onNavigate as (page: string) => void}
      onOpenLeadModal={onOpenLeadModal}
    />
  );
};
