//The following code computes the Nth Fibonacci number
function fib(n) {
    if(n <= 0) {
        return 0;
    }
    else if (n === 1) {
        return fib(n-1) + fib(n-2);
    }
}