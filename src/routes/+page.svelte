<script>
    export let data;
    console.log("data", data)
  </script>

  <ul>
    {#each data.countries as country}
      <li>{country.name}</li>
    {/each}
  </ul>