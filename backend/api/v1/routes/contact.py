from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
import logging

router = APIRouter()

# Define Pydantic model for contact form data
class ContactSchema(BaseModel):
    name: str
    email: EmailStr
    description: str

@router.post("/contact", status_code=status.HTTP_200_OK)
async def submit_contact_form(contact_data: ContactSchema):
    """
    Handle contact form submissions.
    Simulates sending an email to the support team.
    """
    try:
        # Construct the email content
        recipient = "vansh.sharma2024@nst.rishihood.edu.in"
        subject = f"New Help Request from {contact_data.name}"
        body = f"""
        Name: {contact_data.name}
        Email: {contact_data.email}
        Description:
        {contact_data.description}
        """

        # Log the email sending action (Simulation)
        print(f"--- SIMULATING EMAIL SENDING ---")
        print(f"To: {recipient}")
        print(f"Subject: {subject}")
        print(f"Body: {body}")
        print(f"--------------------------------")

        return {"message": "Email sent successfully"}

    except Exception as e:
        print(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process request"
        )
