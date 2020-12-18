# CSS styles

Files and folder structure explained:

##  `/`, root

- `/styles.css`: the base files we use to import other
- `/variables.css`: to be used for using the same things accross files. We should use local variables when possible, but also move in this files all the things "common" between elements of the site.
- `/utilities.css`: keep here, because we want to get rid of it eventually

## `/layout`

Defines the overall aspect of the site, the direction of the main elements (html, body, .Site), shared logic accross all elements, for how they look and behave on different screen sizes.

Also, there are some elements to be used to give visual dynamism to the site, like `container` and `section`.

## `/components`

Each file should represent the specific behavior of:
- an HTML element, or a logic group (semantic sibblings, parent/sibblings)
- a custom web-component (implemented in HTML, with or without js)
- regular CSS classes with [Block Element Modifier logic](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)


# Developping

Try to use the browser defaults when possible, apply minimal styling to keep the layout and independent elements, fluid, mobile first and responsibe.

Use a simple, descriptive and concise naming for your element, classes and behaviors.

Create a component file for each new element that does not already have its logical place in the exisiting structure.

When possible, use variables to represent the value of a css declaration, so it can be reused on other elements, and give a general cohesion in the whole.

# Long term objectives

- move down the specific styles for the web-components, to their custom element definition in the appropriate javascript files
- keep the structure evolving organically with needs
- extract styles into a reusable layout-system.
- define default styles for default css elements
- define a clear semantic of custom elements, working well independently and combined. Use their properties instead of classes to style their look and behavior.
