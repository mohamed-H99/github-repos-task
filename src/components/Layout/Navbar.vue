<template>
  <nav id="navbar">
    <div class="container-fluid">
      <!-- title -->
      <h2 class="title">
        <span><v-icon name="poll" scale="1.5" /> Trending</span>Repos
      </h2>
      <!-- search bar -->
      <div class="search-bar">
        <v-icon name="search" />
        <input
          type="text"
          placeholder="Search.."
          @input="searchRepo"
          v-model="searchValue"
        />
        <span class="spinner" v-show="searchValue"></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: function () {
    return {
      searchValue: null,
    };
  },
  methods: {
    searchRepo() {
      // active spinner after 1s
      setTimeout(() => {
        document.querySelector(".spinner").classList.add("activate");
      }, 1000);
      // remove spinner after..
      setTimeout(() => {
        document.querySelector(".spinner").classList.remove("activate");
      }, 5000);
    },
  },
};
</script>

<style lang="scss" scoped>
#navbar {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  background-color: var(--white);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .container-fluid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    .title {
      margin: 0;
      span {
        color: var(--blue);
      }
    }
    .search-bar {
      position: relative;
      svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0.5rem;
        opacity: 0.5;
        pointer-events: none;
      }
      input {
        border: 0;
        outline: none;
        font-family: var(--font);
        color: var(--dark);
        padding: 0.5rem 2rem;
        border-radius: 99rem;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px;
        transition: var(--transit);
        &:focus {
          border-color: var(--blue);
        }
      }
      .activate.spinner {
        position: absolute;
        top: 20%;
        right: 0.8rem;
        height: 1rem;
        width: 1rem;
        border-radius: 99rem;
        background-color: transparent;
        border: 3px solid transparent;
        border-top-color: var(--blue);
        animation: spin 0.7s linear infinite;
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
}
// media query
@media (max-width: 600px) {
  #navbar {
    .container-fluid {
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
