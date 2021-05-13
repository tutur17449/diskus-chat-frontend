export const getCurrentConversation = (state) => {
  return state.messages.currentConversation;
};

export const getMessages = (targetUser) => (state) => {
  return state.messages.messagesList.filter(
    (i) => i.sender === targetUser || i.receiver === targetUser
  );
};

export const getNotifications = (state) => {
  return state.messages.notificationsList;
};

export const getUser = (id) => (state) => {
  return state.users.usersList.find((user) => user.id === parseInt(id));
};
