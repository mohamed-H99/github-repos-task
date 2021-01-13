<template>
  <footer id="custom-footer">
    <p>
      Copyright &copy; {{ new Date().getFullYear() }}, made by
      <a href="https://github.com/mohamed-H99/" target="_blank">ahmedhashem</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: "CustomFooter"
}
</script>

<style>
#custom-footer {
  background-color: var(--light);
  padding: 0.5rem 0;
  margin-top: 1rem;
}
#custom-footer p {
  text-align: center;
}
</style>