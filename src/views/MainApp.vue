<template>
  <section id="main-app">
    <!-- navbar -->
    <navbar></navbar>

    <!-- content -->
    <div class="container">

      <h1>The most starred Github repos that were created {{ time_interval }} </h1>
      <!-- paginate pages -->
      <paginate
        name="lists"
        :list="fetchedRepos"
        :per="1"
        class="paginate-list"
      >
        <li
          v-for="list in paginated('lists')"
          :key="list.page_id"
        >
          <!-- repo list.items -->
          <repo-box
            v-for="repo in list.items"
            :key="repo.id"
            :data="repo"
          />
        </li>
      </paginate>
      <!-- pagination -->
      <paginate-links
        for="lists"
        :limit="2"
        :show-step-links="true"
        v-show="fetchedRepos"
      ></paginate-links>
    </div>

    <!-- footer -->
    <custom-footer />
  </section>
</template>

<script>
import Navbar from "../components/Layout/Navbar"
import RepoBox from "../components/Layout/RepoBox"
import CustomFooter from "../components/Layout/CustomFooter"
import moment from "moment"

export default {
  name: "MainApp",
  components: {
    Navbar,
    RepoBox,
    CustomFooter
  },
  data: function() {
    return {
      fetchedRepos: [],
      paginate: ["lists"],
      per_page: 100
    }
  },
  computed: {
    // get a usable date to put it in the api_url
    api_date() {
      let date30DaysAgo = moment().subtract(30, 'days').calendar();
      let usable_date = moment(date30DaysAgo).format("YYYY-MM-DD");
      return usable_date;
    },
    // the date the list depends on
    time_interval() {
      return moment(this.api_date).fromNow();
    }
  },
  created: function() {
    let api_url = `https://api.github.com/search/repositories?q=created:>${this.api_date}&sort=stars&order=desc&per_page=${this.per_page}`
    // call the function to fetch data
    this.fetchRepos(api_url, 1); // (url, page_number)
  },
  methods: {
    async fetchRepos(api_url, page_num) {
      // add id to each list to add it in the :key
      let id = 0;
      // fetch/get data from the api & add page_number
      await this.$http.get(api_url + `&page=${page_num}`)
        .then((response) => {
          // increase id to let each list has a unique id
          response.data.page_id = id++;
          // push the list to our array
          this.fetchedRepos.push(response.data);
          // check if the results is incomplete..
          if (response.data.incomplete_results == true) {
            // ..do a recursive function with the next page in the @parameter
            this.fetchRepos(api_url, ++page_num); // page_num = page_num + 1; [++]*(before not after!)
          }
        }).catch((err) => {
          // catch error
          console.log(err);
          alert('Bad Connection, please refresh your page!');
        });
    }
  },
  mounted: function() {
    // scroll top every time you press a pagination link
    document.querySelector('.paginate-links').addEventListener('click', () => {
      window.scrollTo(0, 0);
    });
  }
}
</script>

<style lang="scss">
#main-app {
  margin-top: 5.5rem;
  min-height: 100vh;
  .container {
    ul {
      list-style: none !important;
      padding: 0;
      margin: 0;
      &.paginate-links {
        margin: 2rem auto;
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        align-items: center;
        li {
          &.disabled {
            a {
              pointer-events: none;
              display: none;
            }
          }
          &.active {
            a {
              background: var(--blue);
              color: white;
            }
          }
          a {
            display: inline-block;
            padding: 0.2rem;
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            border-radius: 99rem;
            background-color: var(--light);
            transition: var(--transit);
            cursor: pointer;
            &:hover {
              background: var(--blue);
              color: white;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 600px) {
  #main-app {
    margin-top: 10.5rem;
  }
}
</style>