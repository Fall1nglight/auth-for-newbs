const db = require('../db/connection');

const statistics = db.get('statistics');

const statisticsTypes = {
  edit: 'numOfEdited',
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

    console.log(
      `Sucessfully created '${statisticsTypes.edit}' in the database!`
    );
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
  }
};

createStatistics();
