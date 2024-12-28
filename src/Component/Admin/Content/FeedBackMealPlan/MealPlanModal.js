import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const MealPlanModal = ({ isOpen, onClose, onSubmit, approvalData, onChange }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    let formErrors = {};
    if (!approvalData.fmName.trim()) {
      formErrors.fmName = "Fitness Manager Name is required.";
    }
    if (!approvalData.feedback.trim()) {
      formErrors.feedback = "Feedback is required.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields.");
      return;
    }

    setErrors({});
    onSubmit();
  };

  return (
    <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Approve Meal Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fmName" className="mb-3">
            <Form.Label>
              <strong>Fitness Manager Name</strong>
            </Form.Label>
            <Form.Control
              type="text"
              name="fmName"
              value={approvalData.fmName}
              onChange={onChange}
              placeholder="Enter the Fitness Manager's Name"
              isInvalid={!!errors.fmName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fmName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="feedback" className="mb-3">
            <Form.Label>
              <strong>Feedback</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="feedback"
              value={approvalData.feedback}
              onChange={onChange}
              placeholder="Provide detailed feedback for the meal plan"
              isInvalid={!!errors.feedback}
            />
            <Form.Control.Feedback type="invalid">
              {errors.feedback}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={handleSubmit}
          className="d-flex align-items-center"
        >
          <i className="me-2 bi bi-check-circle"></i> Submit
        </Button>
        <Button
          variant="secondary"
          onClick={onClose}
          className="d-flex align-items-center"
        >
          <i className="me-2 bi bi-x-circle"></i> Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MealPlanModal;
