import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { changePassword } from "@/lib/userData";
import { useRouter } from "next/router";

export default function Account() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning("");
    setSuccess(false);

    if (newPassword !== confirmNewPassword) {
      setWarning("New passwords do not match");
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Change Password</h2>
          Update your account password:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Current Password:</Form.Label>
          <Form.Control
            type="password"
            value={currentPassword}
            id="currentPassword"
            name="currentPassword"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            id="newPassword"
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm New Password:</Form.Label>
          <Form.Control
            type="password"
            value={confirmNewPassword}
            id="confirmNewPassword"
            name="confirmNewPassword"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />
        {warning && <Alert variant="danger">{warning}</Alert>}
        {success && (
          <Alert variant="success">Password changed successfully!</Alert>
        )}
        <Button variant="primary" className="pull-right" type="submit">
          Change Password
        </Button>
      </Form>
    </>
  );
}
