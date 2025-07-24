function ErrorComponent(props) {
  console.log("Hello from console!"); // ❌ should trigger "no-console"
  return <h1>{props.title}</h1>;
}
export default ErrorComponent;