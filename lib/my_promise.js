class MyPromise {

  then(onFulfilled, onRejected) {

    const fulfilledTask = () => {
      onFulfilled(this.promiseResult);
    };

    const rejectedTask = () => {
      onRejected(this.promiseResult);
    };

    switch(this.promiseState) {
      case "pending":
        this.fulfillReactions.push(fulfilledTask);
        this.rejectReactions.push(rejectedTask);
        break;
      case "fulfilled":
        addToTaskQueue(fulfilledTask);
        break;
      case "rejected":
        addToTaskQueue(rejectedTask);
        break;
    }
  }

  resolve(value) {
    if (this.promiseState !== 'pending') return;
    this.promiseState = 'fulfilled';
    this.promiseResult = value;
    this._clearAndEnqueueReactions(this.fulfillReactions);
    return this; // enable chaining
  }

  reject(reason) {
    if (this.promiseState !== 'pending') return;
    this.promiseState = 'rejected';
    this.promiseResult = reason;
    this._clearAndEnqueueReactions(this.fulfillReactions);
    return this;
  }

  _clearAndEnqueueReactions(reactions) {
    this.fulfillReactions = undefined;
    this.rejectReactions = undefined;
    reactions.map(addToTaskQueue);
  }
}

function addToTaskQueue(task) {
  setTimeout(task, 0);
}
