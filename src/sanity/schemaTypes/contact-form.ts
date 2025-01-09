import { defineType,defineField } from "sanity";

export default defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).error('First name is required and should have at least 2 characters.'),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).error('Last name is required and should have at least 2 characters.'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .email()
          .error('A valid email address is required.'),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule) =>
        Rule.min(10)
          .max(1000)
          .error('Message should be between 10 and 1000 characters.'),
    }),
  ],
})
