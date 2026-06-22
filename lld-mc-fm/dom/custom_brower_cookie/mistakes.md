1. If asked "Why did you use Object.defineProperty?", a strong answer would be:

ans. Object.defineProperty is mainly used when we want to add custom behavior while reading or writing a property. It allows us to define getter and setter functions for a property.

In this problem, the requirement was to use document.myCookie as a property instead of methods like setCookie() and getCookie(). So I used Object.defineProperty to define custom getter and setter methods. This lets me perform additional logic whenever document.myCookie is read or updated, such as parsing the cookie string, storing cookies internally, handling expiration, and returning the cookies in the expected format.

2. why setTimeout is used

ans. setTimeout to check the cookies after 1.5 seconds, if we will not setTimeout then we will get all the cookies because the max-age of name cookie is 1 second and we are checking after 1.5 seconds so it will be expired and it will not be shown in the output.