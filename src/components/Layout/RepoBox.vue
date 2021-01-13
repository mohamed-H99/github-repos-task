<template>
  <div class="repo-box">
    <!-- avatar -->
    <img class="user-avatar" :src="data.owner.avatar_url" :alt="data.owner.type">
    <div class="content">
      <!-- name -->
      <h3 class="repo-name">
        <a :href="data.url">{{ data.name }}</a>
      </h3>
      <!-- description -->
      <p class="repo-desc">{{ data.description | shorten }}</p>
      <div class="details">
        <!-- stars -->
        <span class="stars"><v-icon name="star" /> {{ data.watchers_count | bigNumsCheck }}</span>
        <!-- issues -->
        <span class="issues">Issues: {{ data.open_issues_count | bigNumsCheck }}</span>
        <!-- extra -->
        <p>
          submitted <em v-text="submittedDate"></em>, by
          <a :href="data.owner.html_url">{{ data.owner.login }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "RepoBox",
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  filters: {
    shorten(text) {
      if (text) {
        if (text.length <= 100) {
          return text;
        } else {
          return text.slice(0, 120) + "...";
        }
      }
    },
    bigNumsCheck(num) {
      if (num && num > 999) {
        return `${(num/1000).toFixed(1)}k`;
      } else {
        return num;
      }
    }
  },
  computed: {
    submittedDate() {
      return moment(this.data.pushed_at).fromNow();
    }
  }
}
</script>

<style lang="scss" scoped>
.repo-box {
  padding: 1rem 2rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  display: flex;
  gap: 1.5rem;
  justify-content: flex-start;
  align-items: center;
  transition: var(--transit);
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
  }
  .user-avatar {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 0.5rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .repo-name {
      margin-bottom: 0;
      a {
        text-decoration: none;
        color: var(--blue);
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .repo-desc {
      margin-top: 0.4rem;
      font-size: 0.9rem;
    }
    .details {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        padding: 0.2rem 0.5rem;
        background-color: var(--blue);
        color: var(--white);
        margin-right: 0.5rem;
        font-size: 0.8rem;
        border-radius: 0.25rem;
      }
      p {
        a {
          color: var(--dark);
        }
      }
    }
  }
}
// media query
@media (max-width: 600px) {
  .repo-box {
    font-size: 14px;
    padding: 0.6rem 1.2rem;
    .user-avatar {
      width: 70px;
      height: 70px;
      border-radius: 0.25rem;
    }
    .content {
      justify-content: center;
      .repo-desc {
        margin-top: 0.3rem;
        font-size: 0.8rem;
      }
      .details {
        display: block;
        span {
          padding: 0.2rem 0.4rem;
          display: inline-block;
          margin-bottom: 0.3rem;
        }
      }
    }
  }
}
</style>