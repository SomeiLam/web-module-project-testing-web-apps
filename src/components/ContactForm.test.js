import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText("Contact Form");
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent("Contact Form");
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameInput, "Amy");
    const errorMessage = await screen.queryByText("Error: firstName must have at least 5 characters.");
    expect(errorMessage).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const error = await screen.getAllByTestId("error");
    expect(error).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(firstNameInput, "Allison");
    userEvent.type(lastNameInput, "Bella");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const error = await screen.getAllByTestId("error");
    expect(error.length === 1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(emailInput, "abc");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const errorMessage = await screen.queryByText("Error: email must be a valid email address.");
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastNameInput, "");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const errorMessage = await screen.queryByText("Error: lastName is a required field.");
    expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    const emailInput = screen.getByLabelText(/Email*/i);
    userEvent.type(firstNameInput, "Allison");
    userEvent.type(lastNameInput, "Bella");
    userEvent.type(emailInput, "allison@bella.com"); 
    const button = screen.getByRole("button");
    userEvent.click(button);
    const firstNameResult = await screen.getByTestId("firstnameDisplay");
    const lastNameResult = await screen.getByTestId("lastnameDisplay");
    const emailResult = await screen.getByTestId("emailDisplay");
    expect(firstNameResult).toBeInTheDocument();
    expect(lastNameResult).toBeInTheDocument();
    expect(emailResult).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/First Name*/i);
    const lastNameInput = screen.getByLabelText(/Last Name*/i);
    const emailInput = screen.getByLabelText(/Email*/i);
    const messageInput = screen.getByLabelText(/Message/i);
    userEvent.type(firstNameInput, "Allison");
    userEvent.type(lastNameInput, "Bella");
    userEvent.type(emailInput, "allison@bella.com"); 
    userEvent.type(messageInput, "Nice to meet you!");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const firstNameResult = await screen.getByTestId("firstnameDisplay");
    const lastNameResult = await screen.getByTestId("lastnameDisplay");
    const emailResult = await screen.getByTestId("emailDisplay");
    const messageResult = await screen.getByTestId("messageDisplay");
    expect(firstNameResult).toBeInTheDocument();
    expect(lastNameResult).toBeInTheDocument();
    expect(emailResult).toBeInTheDocument();
    expect(messageResult).toBeInTheDocument();
});