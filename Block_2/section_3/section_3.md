## Functional Programming

Essential elements of functional programming are:

* First Class Functions
* Higher order Functions
* Declarative rather than Imperative code
* Purity
* Composition

## First Class

...

## Higer order

...

## Declarative

...

## Purity

..

## Composition

A function can be written which uses 2 or more functions as arguments and then utililises both to produce a result.

Note that the order of execution for the function effect runs function g first and passes the result to function f.  Evaluating the inner brackets first is the normal way of evaluating and expression.

In the code which follows try editting a to use the compose 1 - 4 functions in turn.

<div
  data-runkit
  data-runkit-evaluate-on-load="true"
  data-runkit-gutter-style="none"
  data-runkit-node-version="18"
>

```javascript
const effect = (f,g) => {
    return x => {
        return f(g(x));
    }
}

const bigEffect = (f,g,h) => {
    return x => {
        return f(g(x)+h(x));
    }
}    


const add1   = (y) => y + 1;
const times2 = (z) => z * 2;
const negate = (w) => w * -1;

const compose1 = effect(add1, times2);
const compose2 = effect(add1, negate);
const compose3 = effect(negate, times2);
const compose4 = bigEffect(add1, times2, negate);

let a = compose1(2);

```
</div>




