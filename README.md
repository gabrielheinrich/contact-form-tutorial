# Contact Form

This is a short tutorial for creating a contact form using html, css and vanilla javascript.
The tutorial comes with a template html file and some base stylings in the .css file.

## Step 1. HTML

Input forms are created using specific html elements, the most important one being the `<input>` tag which can be used to display all kinds of form elements, like a text box, a drop down selection or a checkbox.

But first we start of by creating a `<form>` element which is going to be the container for the entire form.
The `<form>` element should be a child of the `<section>`. We'll also give it the class `contact-form` to distinguish it from other forms.

```html
<form class="contact-form"></form>
```

### Form Fields

We want to have three fields: name, email and message

The name and email will be simple one line text boxes.
These are represented as input tags with the type `text`, i.e. `<input type="text" />`

**Note**: The `input` tag is written as a self-closing tag, i.e. there is no `</input>` tag and instead there is a `/` before the closing angle bracket. Take a close look at the syntax above, before you continue, to notice this.

The message will be a textarea, which can have multiple lines of text.
The html to create such a text area is coincidentally: `<textarea>`

Each of these fields will get an attribute called name, which we'll later use to refer to the individual elements, with an attribute selector.

We'll also give each element a class called `form-field` to select them all at once in css.

Last but not least there's one more attribute, called `placeholder` which can be set to some text to be displayed in the form element, before the user has inserted anything.

Here are the three elements, with all their attributes, insert them into the form container.

Name

```html
<input class="form-field" type="text" placeholder="Name" name="name" />
```

Email

```html
<input class="form-field" type="text" placeholder="Email" name="email" />
```

Message

```html
<textarea class="form-field" name="message" placeholder="Message"></textarea>
```

### Submit Button

We also want a submit button. In forms those are actually also represented as an `<input>` tag, but with the type **submit**.
The attribute value can be set to change the text content of the button. We'll use _Send_ as the value.
We'll also give it the class `btn` to style it.

Insert this element at the bottom of your form after the form fields

```html
<input class="btn" type="submit" value="Send" />
```

## Step 2. Basic Styling

Let's add some styling to the different elements. Open the file [css/style.css](css/style.css)

First off, we'll set the box-sizing to border-box for every element. This is in general a good practice and it helps prevent weird layout bugs, that often happen with input boxes.

```css
* {
  box-sizing: border-box;
}
```

Next we'll select the form-field class and apply some basic styling, by setting the font-weight, a width of 100% and adding a border with border-radius.

```css
.form-field {
  width: 100%;
  padding: 0.5em 1em;
  border: 2px solid black;
  border-radius: 4px;
  font-weight: bold;
}
```

The text are still has a resize button in the top right corner, which we'll disable. We'll instead increase the height to 10em

```css
.contact-form textarea {
  height: 10em;
  resize: none;
}
```

The text color of the form field placeholder can be set with a pseudo element selector

```css
.form-field::placeholder {
  color: #aaa;
}
```

We'll later switch to a different method for increasing the margin between the fields, but for now let's also add a margin-bottom to the form-fields

```css
.form-field {
  margin-bottom: 5em;
}
```

## Step 3. Popup Confirmation

Now we can startadding some actual functionallity to the input form by using javascript.

Open the index.js file.

### Query Selectors

Let's first create some variables for all the different dom elements we'll be using. We'll use some more advanced css selectors to achieve this.

```js
const form = document.querySelector("form.contact-form");

const nameInputField = document.querySelector(
  '.contact-form input[name="name"]'
);

const emailInputField = document.querySelector(
  '.contact-form input[name="email"]'
);

const messageTextArea = document.querySelector(
  '.contact-form textarea[name="message"]'
);
```

### Submit event listener

Next we'll create a function called `handleSubmit` and add it as an EventListener to the form itself on the _submit_ event.

This is preferably to using a click event on the submit button, because the submit event will also triggered by other means, e.g. hitting the enter key, while the click event con only be specifically triggered by a click.

We'll use the event parameter and call a method called preventDefault on the event itself. That will - as the name suggests - prevent the default behaviour of the event, which would be a redirect to another URL and result in a reload of the page. We'll instead handle the event programmatically in Javascript alone.

```js
const handleSubmit(event) {
  event.preventDefault();
}

form.addEventListener("submit", handleSubmit);
```

Add a console.log statement to the handleSubmit function to see if the submit event will be triggered.

### Popup Setup

In a real application we would want to send the actual message to the server when the form is submitted. However we'll skip this step for practical reasons in this example and instead settle on just displaying a modal popup window.

First we have to setup the html structure for this.
Add this div element at the end of your body. We'll hide it by default and set its positioning to fixed, so its position in the html hierarchy can be arbitrary. At the end of the body is however a good default place to put hidden modal elements like this popup.

```html
<div class="popup-container">
  <div class="popup" id="contact-form-submitted">
    <h3>Thank you!</h3>
    <p>Your message has been sent.</p>
    <p>We'll get back to you as soon as possible.</p>
    <div class="btn">OK</div>
  </div>
</div>
```

Now in the style.css file we have to set some properties to make sure the popup is hidden by default. We'll also introduce a class called **show-popup** that we can add to the body to show or hide the popup window.

```css
.popup-container {
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: none;
}
.show-popup .popup-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

The popup container adds a close to transparent black overlay.

```css
.popup {
  padding: 1.5rem 3rem;
  text-align: center;
  background-color: white;
  margin-bottom: 38vh;
}
```

The margin on the bottom of the popup itself is just to position it visually not directly in the center of the page, but slightly higher.

Let's now connect everything through Javascript.

We'll start this by adding to functions: showPopup and closePopup, which will just add and remove the show-popup class on the body element

```js
const showPopup = () => {
  document.body.classList.add("show-popup");
};

const closePopup = () => {
  document.body.classList.remove("show-popup");
};
```

We can now call the showPopup method inside our handleSubmit function

```js
const handleSubmit(event) {
  event.preventDefault();
  showPopup();
}
```

This will open the popup on submit, but there's no way to close it yet.
Therefore we have to add the closePopup function as an EventListener to the button in the Popup itself.
Here's the one liner to do this.

```js
document.querySelector(".popup .btn").addEventListener("click", closePopup);
```

Give it a try. Enter some values in the form fields and click Send and close the popup again. Do you notice something that's annoying?

The fields of the form never get cleared. Let's write a function that can do this and call it whenever the popup gets closed, i.e. in the closePopup function.
To clear an input field we simply use the bindings we already created to the DOM elements of the fields and set the value property to null.

```js
const clearContactForm = () => {
  nameInputField.value = null;
  emailInputField.value = null;
  messageTextArea.value = null;
};
```

And then update the closePopup function by adding a call to `clearContactForm`. Then give it a try and see whether the form actually gets cleared.

## Step 4. Validation & Error Messages

Whenever a form is used on a website it's probably a good idea to add some validation to the input data the user is providing to quickly tell the user via error messages what kind of information the form is expecting.

It's considered good practice to display the error messages for a specific form field as closely as possible to the input field as possible, preferably above the field itself.
To be able to do this, we'll add `<span>` element above each of the form fields with the class error-message and another _subclass_ that is specific to one of the fields, e.g. `error-message-email`
So watch out: these spans will go right above the `<input>` and the `<textarea>` elements

Name error message

```html
<span class="error-message error-message-name">Please tell us your name</span>
```

Email error message

```html
<span class="error-message error-message-email"
  >Please enter your email address</span
>
```

Message error message

```html
<span class="error-message error-message-message">Enter your message</span>
```

We'll add some CSS to have these messages displayed in red and hide them by default. We'll use visiblity:hidden instead of display: none for this, so when an error occurs the space for the error message has already been allocated and the layout won't jump around.

```css
.error-message {
  color: red;
  font-size: 0.8em;
  margin: 0.2em;
  margin-top: 0.4em;
  font-weight: bold;
  visibility: hidden;
}
```

The hidden error messages provide enough margin between the form fields, so we can delete the margin-bottom property on the form-field class that we created in an earlier step.

```css
.form-field {
  /* This can be deleted: */
  /* margin-bottom: 5em; */
}
```

We'll create a little utility class to be able to toggle the visibility of the error messages

```css
.show {
  visibility: visible;
}
```

It also makes sense to create a helper function to be able to show an error message in javascript

```js
const showErrorMessage = selector => {
  document.querySelector(selector).classList.add("show");
};
```

### Form input validation

Now we'll jump back into the handleSubmit function to write some program logic that will look at the input the user has provided and check whether the values are actually valid.

We can get access to the value inside the form by using the value property of the DOM elements.

This is all happening in the **handleSubmit** function

```js
const name = nameInputField.value;
const email = emailInputField.value;
const message = messageTextArea.value;
```

We'll start with a very simple validation, that is just going to check whether the input data is not equal to null and not the empty string.

```js
const nameValid = name != null && name != "";
const emailValid = email != null && email != "";
const messageValid = message != null && message != "";
```

Now we have some boolean values which we have to combine to check whether all of the fields contain valid data. We can use the `&&` operator to do this and move the showPopup call into an if then branch. Let's also add some console.log statements to pretend we would be actually sending the message to the server.

```js
if (nameValid && emailValid && messageValid) {
  console.log("Send message to server...");
  console.log(`name: ${name}\nemail: ${email}\nmessage: ${message}`);
  showPopup();
} else {
  /* ... */
}
```

So this code makes now sure that the popup will only show if all the form fields contain valid data.
But what if they don't? Then we want to show the corresponding error messages. So here's the else branch of the if statement above

```js
else {
  if (!nameValid) {
    showErrorMessage(".error-message-name");
  }
  if (!emailValid) {
    showErrorMessage(".error-message-email");
  }
  if (!messageValid) {
    showErrorMessage(".error-message-message");
  }
}
```

This will give the user some hints to which fields need a review.

### Reset error messages

There's one bug we still have in the application and that's we never hide the error messages again, even after the user has corrected the data.

Let's fix this by writing a function called clearErrorMessages and calling it at the beginning of handleSubmit as a reset action.

We'll use document.querySelectorAll witht the error-message class to get a list of all the error message elements. This call will return a node list, which has a method forEach to which we'll pass some instructions that should be performed on each errorMessage.
For us this will be removing the `.show` class

Here's the code

```js
const clearErrorMessages = () => {
  document.querySelectorAll(".error-message").forEach(errorMessage => {
    errorMessage.classList.remove("show");
  });
};
```

Now add this code to the beginning of the handleSubmit function and give it a try.

### Addon: Regex Email validation

We are using a pretty simple validation scheme, that's not nearly catching all possible forms of invalid data the user could enter.
For example the string "This is not an email" would be accepted as an email.

Let's fix this, by using a regex.

A simple regex for matching emails looks like this

```regex
/\w+@\w+\.\w+/
```

It is making sure that there's an @ sign and a . somewhere in the string.

To test whether a string matches a regex we call the test method on the regex and provide it the string to be tested as an argument.

```js
/\w+@\w+\.\w+/.test("info@email.com") // true
/\w+@\w+\.\w+/.test("This is not an email") // false
```

So let's add that extra condition to the email validation

Find the line inside handleSubmit where the variable emailValid gets defined and modify it like this:

```js
const emailValid = email != null && email != "" && /\w+@\w+\.\w+/.test(email);
```

Test whether the validation is now more strict.
