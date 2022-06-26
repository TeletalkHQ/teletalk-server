Read me before start do things on test files. you have to know how things works, how to use variables and how to build clean/efficient tests

We have a requirements.spec file to make initial data for test files like users with special patterns.

Usage of testUsers in api tests: {
[mainUser: testUser_0] : [signIn, verifySignIn, createNewUser, logout],
[mainUser: testUser_1] : [signIn, verifySignIn, logout],
[mainUser: testUser_2, targetUsers:[_3] ] : [],
}
