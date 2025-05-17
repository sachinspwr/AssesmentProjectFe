import React, { useState, ReactElement } from "react";
import { TermsAndServices } from "../organisms/compliance/terms-and-services.organism";
import { Privacypolicy } from "../organisms/compliance/privacy-policy.organism";
import { Cookies } from "../organisms/compliance/cookies.organism";
import { Lisence } from "../organisms/compliance/lisence.organism";
import { Modal } from "@components/organisms";

function Compliance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactElement | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  const openModal = (content: ReactElement, title: string) => {
    setModalContent(content);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  return (
    <>
      <footer className="w-full h-16px flex justify-center items-center py-4 bg-gray-200 fixed bottom-0 left-0">
        <div className="text-sm flex gap-2">
          <button onClick={() => openModal(<TermsAndServices />, "Terms and Services")}>Terms</button>
          <span>|</span>
          <button onClick={() => openModal(<Privacypolicy />, "Privacy Policy")}>Privacy Policy</button>
          <span>|</span>
          <button onClick={() => openModal(<Lisence />, "License Agreement")}>License Agreement</button>
          <span>|</span>
          <button onClick={() => openModal(<Cookies />, "Cookies Policy")}>Cookies</button>
        </div>
      </footer>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} 
        onClose={closeModal} 
        title={modalTitle}
        width={80}
        height={{ value: 75, unit: 'vh' }}
        showFooter={true}
        >
          {modalContent}
        </Modal>
      )}
    </>
  );
}

export { Compliance };
