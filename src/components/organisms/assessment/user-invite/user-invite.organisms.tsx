import { useState } from "react";
import { VButton, VInput } from "@components/atoms";
import { useCreateTestInvitationMutation } from "../../../../store/slices/test-invitation.slice";
import { TestResponseDTO } from "@dto/response";

type UserInviteProps = {
  data: TestResponseDTO;
  onClose: () => void;
};

function UserInvite({ data, onClose }: UserInviteProps) {
  const [email, setEmail] = useState("");
  const [createTestInvitation, { isLoading }] = useCreateTestInvitationMutation();

  const handleSubmit = async () => {
    if (!email) return;

    console.log(data);

    const payload =
    {
      testId: data?.id,
      email,
      message: "You're invited to take the test.",
      status: "Pending",
      isPersonal: true,
      testLink: {
        activeFrom: "2025-05-15T09:00:00Z",
        activeUntil: "2025-05-30T18:00:00Z",
        timeZone: "IST",
      },
    };


    try {
      await createTestInvitation(payload).unwrap();
      setEmail(""); // clear the field after success
      onClose();
    } catch (error) {
      console.error("Invitation error:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <VInput
        type="email"
        name="email"
        placeholder="Enter Email..."
        required
        value={email}
        onChange={(value) => setEmail(value)}
      />
      <VButton
        variant="primary"
        size="sm"
        className="!w-20 !h-10 !mb-2"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Inviting..." : "Invite"}
      </VButton>
    </div>
  );
}

export default UserInvite;
