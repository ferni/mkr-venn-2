
const data = {
  groups: [
    {
      id: '1',
      name: 'Maker',
      color: 'darkgreen'
    },
    {
      id: '2',
      name: 'Business',
      color: 'red',
      parent: '1'
    },
    {
      id: '3',
      name: 'Technology',
      color: 'blue',
      parent: '1'
    },
    {
      id: '4',
      name: 'Communications',
      color: 'teal',
      parent: '2'
    },
    {
      id: '5',
      name: 'Ops/Finance',
      color: 'orange',
      parent: '2'
    },
    {
      id: '6',
      name: 'Marketing',
      color: 'blue',
      parent: '4'
    },
    {
      id: '7',
      name: 'Analytics',
      color: 'lightgreen',
      parent: '4'
    },
    {
      id: '8',
      name: 'Enterprise Comms',
      color: 'gray',
      parent: '2'
    },
    {
      id: '9',
      name: 'BD',
      color: 'purple',
      parent: '2'
    },
    {
      id: '10',
      name: 'Integrations',
      color: 'pink',
      parent: '1'
    },
    {
      id: '11',
      name: 'Platform',
      color: 'teal',
      parent: '3'
    },
    {
      id: '12',
      name: 'Interfaces',
      color: 'green',
      parent: '11'
    },
    {
      id: '13',
      name: 'Keepers',
      color: 'blue'
    },
    {
      id: '14',
      name: 'Feeds',
      color: 'brown',
      parent: '11'
    },
    {
      id: '15',
      name: 'Market Making',
      color: 'yellow',
      parent: '11'
    },
    {
      id: '16',
      name: 'Devops',
      color: 'purple',
      parent: '3'
    },
    {
      id: '17',
      name: 'Sysadmin',
      color: 'darkgreen',
      parent: '16'
    },
    {
      id: '18',
      name: 'Vulcanize',
      color: 'violet',
      parent: '16'
    },
    {
      id: '19',
      name: 'R & D',
      color: 'darkred',
      parent: '3'
    },
    {
      id: '20',
      name: 'FV',
      color: 'pink',
      parent: '19'
    },
    {
      id: '21',
      name: 'SC Ops',
      parent: '5'
    }
  ],
  members: [
    {
      name: 'Rune',
      groupIds: ['1']
    },
    {
      name: 'Matt',
      groupIds: ['2']
    },
    {
      name: 'Andy',
      groupIds: ['3']
    },
    {
      name: 'Jess',
      groupIds: ['4']
    },
    {
      name: 'Shannon',
      groupIds: ['4']
    },
    {
      name: 'Robert P',
      groupIds: ['4']
    },
    {
      name: 'Ferni',
      groupIds: ['6']
    },
    {
      name: 'Kenny',
      groupIds: ['6', '4', '5']
    },
    {
      name: 'Haley',
      groupIds: ['21']
    },
    {
      name: 'DC',
      groupIds: ['8']
    },
    {
      name: 'Greg',
      groupIds: ['9', '10']
    },
    {
      name: 'Tyler',
      groupIds: ['10', '2', '3', '11']
    },
    {
      name: 'Wouter',
      groupIds: ['10', '11']
    },
    {
      name: 'Sean',
      groupIds: ['10', '11']
    },
    {
      name: 'Soren',
      groupIds: ['11']
    },
    {
      name: 'Ryan',
      groupIds: ['10', '12']
    },
    {
      name: 'Robert',
      groupIds: ['10', '12']
    },
    {
      name: 'Pawel',
      groupIds: ['13', '10', '12']
    },
    {
      name: 'Nik',
      groupIds: ['10', '12', '14']
    },
    {
      name: 'Jordan',
      groupIds: ['12']
    },
    {
      name: 'Gonzalo',
      groupIds: ['12']
    },
    {
      name: 'Mariano',
      groupIds: ['12', '14']
    },
    {
      name: 'Lev',
      groupIds: ['15']
    },
    {
      name: 'Andrew',
      groupIds: ['15']
    },
    {
      name: 'James',
      groupIds: ['15', '16', '17']
    },
    {
      name: 'Rick',
      groupIds: ['18']
    },
    {
      name: 'Mikael',
      groupIds: ['16', '19']
    },
    {
      name: 'Rain',
      groupIds: ['19']
    },
    {
      name: 'Daniel',
      groupIds: ['19']
    },
    {
      name: 'Nikolai',
      groupIds: ['19']
    },
    {
      name: 'Martin',
      groupIds: ['20']
    },
    {
      name: 'Jack',
      groupIds: ['20']
    },
    {
      name: 'Denis',
      groupIds: ['20']
    },
    {
      name: 'Evan',
      groupIds: ['20']
    }
  ]
};

export default data;
