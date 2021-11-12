const db = require('../db/connection');

const statistics = db.get('statistics');

const statisticsTypes = {
  edit: 'numOfEdited',
  done: 'numOfMarkedDone',
};

const createStatistics = async () => {
  try {
    const editCounter = await statistics.findOne({
      name: statisticsTypes.edit,
    });

    if (editCounter)
      throw new Error(
        `'${statisticsTypes.edit}' already exist in the database.`
      );

    await statistics.insert({ name: statisticsTypes.edit, value: 0 });

    const doneCounter = await statistics.findOne({
      name: statisticsTypes.done,
    });
    if (doneCounter)
      throw new Error(
        `'${statisticsTypes.done}' already exist in the database.`
      );

    await statistics.insert({ name: statisticsTypes.done, value: 0 });

    console.log(
      `Sucessfully created '${statisticsTypes.edit}' and '${statisticsTypes.done}' objects in the database`
    );
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
  }
};

createStatistics();
