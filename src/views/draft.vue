<template>
  <div>
    <a href="#" class="btn btn-dark mb-4">Add New Draft</a>
    <!-- draft列表 AdmindraftTable -->
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">id</th>
          <th scope="col">message</th>
          <th scope="col" width="300">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="draft in drafts" :key="draft.id">
          <th scope="row">{{ draft.id }}</th>
          <td>
            <div v-show="!draft.isEditing" class="draft-message">{{draft.message}}</div>
            <input
              v-show="draft.isEditing"
              v-model="draft.message"
              type="text"
              class="form-control"
            />
            <span v-show="draft.isEditing" class="cancel" @click="handleCancel(draft.id)">✕</span>
          </td>
          <td class="d-flex justify-content-between">
            <a href="#" class="btn btn-link">Send</a>
            <button
              v-show="!draft.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(draft.id)"
            >Edit</button>
            <button
              v-show="draft.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="updateDraft({ draftId: draft.id, message: draft.message})"
            >Save</button>
            <button
              @click.stop.prevent="deleteDraft(draft.id)"
              type="button"
              class="btn btn-link"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const dummyData = {
  drafts: [
    {
      id: 1,
      message: "draft1..."
    },
    {
      id: 2,
      message: "draft2..."
    },
    {
      id: 3,
      message: "draft3..."
    }
  ]
};

export default {
  data() {
    return {
      drafts: []
    };
  },
  created() {
    this.fetchDrafts();
  },
  methods: {
    fetchDrafts() {
      // this.drafts = dummyData.drafts;
      this.drafts = dummyData.drafts.map(draft => ({
        ...draft,
        isEditing: false,
        messageCached: ""
      }));
    },
    deleteDraft(draftId) {
      this.drafts = this.drafts.filter(draft => draft.id !== draftId);
    },
    toggleIsEditing(draftId) {
      this.drafts = this.drafts.map(draft => {
        if (draft.id === draftId) {
          return {
            ...draft,
            isEditing: !draft.isEditing,
            messageCached: draft.message
          };
        }
        return draft;
      });
    },
    updateDraft({ draftId, message }) {
      // TODO: 透過 API 去向伺服器更新draft data
      console.log([message]);
      this.toggleIsEditing(draftId);
    },
    handleCancel(draftId) {
      this.drafts = this.drafts.map(draft => {
        if (draft.id === draftId) {
          return {
            ...draft,

            // 把原本的資料還回去
            name: draft.nameCached,
            client_id: draft.client_idCached,
            client_secret: draft.client_secretCached
          };
        }

        return draft;
      });

      this.toggleIsEditing(draftId);
    }
  }
};
</script>

<style scoped>
.draft-message {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: relative;
  right: 20px;
  top: 50%;
  transform: translateY(-130%) translateX(360%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>