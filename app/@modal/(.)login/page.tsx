"use client";

import { useRouter } from "next/navigation";
import Modal from "../../components/dashboard/layout/modal";
import LoginForm from "../../components/auth/login-form";

export default function LoginModal() {
  const router = useRouter();

  return (
    <Modal 
      isOpen={true} 
      title="Login" 
      onClose={() => router.back()}
    >
      <LoginForm />
    </Modal>
  );
}
