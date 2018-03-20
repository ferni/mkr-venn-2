const data = {
  groups: [
    {
      id: '1',
      name: 'One',
      color: 'teal'
    },
    {
      id: '2',
      name: 'Two',
      parent: '1',
      color: 'red'
    },
    {
      id: '3',
      name: 'Three',
      parent: '1',
      color: 'green'
    },
    {
      id: '35',
      name: 'asdf',
      parent: '1',
      color: 'blue'
    },
    {
      id: '4',
      name: 'Four',
      parent: '3'
    },
    {
      id: '5',
      name: 'Five'
    }
  ],
  members: [
    {
      name: 'A',
      groupIds: ['1'],
      lead: '1'
    },
    {
      name: 'B',
      groupIds: ['2'],
      lead: '2'
    },
    {
      name: 'C',
      groupIds: ['2', '3', '35']
    },
    {
      name: 'D',
      groupIds: ['2', '3']
    },
    {
      name: 'E',
      groupIds: ['3'],
      lead: '3'
    },
    {
      name: 'F',
      groupIds: ['4']
    },
    {
      name: 'G',
      groupIds: ['4']
    },
    {
      name: 'H',
      groupIds: ['1', '5']
    },
    {
      name: 'Someone',
      groupIds: ['1']
    }
  ]
};

export default data;
