const store = require("../data/employeeStore");

module.exports = {
  Query: {
    employees: (_, { page = 1, limit = 20 }) => {
      const data = store.load();
      const start = (page - 1) * limit;

      return {
        data: data.slice(start, start + limit),
        total: data.length,
        page,
        limit
      };
    },

    subjects: () => {
      const data = store.load();
      const set = new Set();

      data.forEach(e => {
        e.subjects.forEach(s => set.add(s));
      });

      return Array.from(set).sort();
    }
  },

  Mutation: {
    addEmployee: (_, payload) => {
      const data = store.load();
      const emp = { id: Date.now().toString(), ...payload };
      data.push(emp);
      store.save(data);
      return emp;
    },

    updateEmployee: (
      _,
      { id, name, age, className, subjects, attendance, role }
    ) => {
      const data = store.load();
      const idx = data.findIndex(e => e.id === id);
      if (idx === -1) throw new Error("Not found");

      const prev = data[idx];

      data[idx] = {
        ...prev,

        name,
        age,
        className,

        // ✅ subjects now correctly received
        subjects: Array.isArray(subjects) ? [...subjects] : prev.subjects,

        attendance,
        role
      };

      store.save(data);
      return data[idx];
    },

    deleteEmployee: (_, { id }) => {
      const data = store.load();
      store.save(data.filter(e => e.id !== id));
      return true;
    }
  }
};
