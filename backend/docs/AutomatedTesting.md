# Automated Testing

Running automated testing; unit testing to end to end testing.

## Table of Content

- [Running the test](#running-the-test)

## Running the test

Run the test using following command:

```sh
npm run test
```

## How it works

The test command will run the test files present in the **test directory** of the backend

Currently it runs all the **--.test.ts, routes/--.test.ts and util/--.test.ts** files

## Stubbing using TestContext Object

**t** is the **TestContext** object provided by Node’s built-in test runner (node:test) to each test callback:

```typescript
test("description", async (t) => {
	// t is the TestContext
});
```

Way to use it

```typescript
t.mock.method(
	PropertyService.prototype,
	"getPropertiesByName",
	async () => properties as never,
);
```

This method is also called **Stubbing** in testing.

It replaces the real getPropertiesByName implementation with a fake one that **returns predefined data**.
