// Use the 'filter' property to set Tailwind css filters on images

export const executives: { name: string, role: string, image?: string, filter?: string }[] = [
  {
    name: 'Nathan Luo',
    role: 'President',
    image: '/people/2024/nathan-luo.png',
  },
  {
    name: 'Hanshi Tang',
    role: 'Vice President',
    image: '/people/2024/hanshi-tang.jpg',
  },
  {
    name: 'Harshit Badam',
    role: 'Secretary',
    image: '/people/2024/harshit-badam.jpg',
    filter: 'contrast-[1.1] saturate-[0.7] brightness-150',
  },
  {
    name: 'Georgina Qiu',
    role: 'Treasurer',
    image: '/people/2024/georgina-qiu.jpg',
  },
]

export const directors: { name: string, role: string, image?: string, filter?: string }[] = [
  {
    name: 'Daksh Agrawal',
    role: 'Education Director',
    image: '/people/2024/daksh-agrawal.jpg',
  },
  {
    name: 'Hannah Luo',
    role: 'Events Director',
    image: '/people/2024/hannah-luo.jpg',
  },
  {
    name: 'Kevin Tang',
    role: 'Industry Director',
    image: '/people/2024/kevin-tang.jpg',
  },
  {
    name: 'Michael Ren',
    role: 'IT Director',
    image: '/people/2024/michael-ren.jpg',
  },
  {
    name: 'Ryan Li',
    role: 'Design Director',
    image: '/people/2024/ryan-li.jpg',
  },
  {
    name: 'Danielle Tran',
    role: 'Marketing Director',
    image: '/people/2024/danielle-tran.png',
  },
]

export const representatives: { name: string, role: string, image?: string, filter?: string }[] = [
  {
    name: 'David Ponder',
    role: 'Graduate Representative',
    image: '/people/2024/david-ponder.jpg',
    filter: 'contrast-[1.1] brightness-125',
  },
  {
    name: 'Nan Sang',
    role: 'Graduate Representative',
    // image: '',
  },
  {
    name: 'Harshit Badam',
    role: 'Undergraduate Representative',
    // image: '',
  },
  {
    name: 'Jacky Liao',
    role: 'Undergraduate Representative',
    // image: '',
  },
  {
    name: 'Rania Aziz',
    role: 'Undergraduate Representative',
    // image: '',
  },
  {
    name: 'Dhruv Ajay',
    role: 'Undergraduate Representative',
    // image: '',
  },
]

// The default role for team members is set to '<Team name> Officer', so don't need to set it manually here

export const teams: { 
  name: string, 
  members: {
    name: string,
    role?: string, 
    image?: string,
    filter?: string
  }[] 
}[] = [
  {
    name: 'Education',
    members: [
      {
        name: 'Mikael Sutiono',
        image: '/people/2024/mikael-sutiono.jpg',
      },
      {
        name: 'Jongho Park',
        // image: '',
      },
      {
        name: 'Keshav Prasath',
        // image: '',
      },
    ],
  },
  {
    name: 'Events',
    members: [
      {
        name: 'Nhat Anh Le',
        image: '/people/2024/nhat-anh-le.jpg',
      },
      {
        name: 'Ayra Hani',
        // image: '',
      },
      {
        name: 'Angus Chan',
        image: '/people/2024/angus-chan.jpg',
      },
      {
        name: 'Davyn Sumardi',
        image: '/people/2024/davyn-sumardi.jpg',
      },
      {
        name: 'Rayan Arain',
        // image: '',
      },
      {
        name: 'Ayushi Chauhan',
        image: '/people/2024/ayushi-chauhan.jpg',
      },
      {
        name: 'Madhumita Venkataraman',
        // image: '',
      },
      {
        name: 'Paige Meng',
        role: 'Graduate Officer',
        // image: '',
      },
    ],
  },
  {
    name: 'Industry',
    members: [
      {
        name: 'Sarah Williams',
        // image: '',
      },
      {
        name: 'Halley Dao',
        // image: '',
      },
      {
        name: 'Manan Saddi',
        // image: '',
      },
      {
        name: 'Shashank Sanjay Bhat',
        // image: '',
      },
      {
        name: 'Khushi Malhotra',
        image: '/people/2024/khushi-malhotra.png',
      },
    ],
  },
  {
    name: 'Marketing',
    members: [
      {
        name: 'Navya Malhotra',
        // image: '',
      },
      {
        name: 'Saki Hiraoka',
        // image: '',
      },
      {
        name: 'Rebecca Feng',
        role: 'Design Director',
        image: '/people/2024/rebecca-feng.jpg',
      },
      {
        name: 'Danielle Tran',
        // image: '',
      },
      {
        name: 'Ryan Li',
        // image: '',
      },
      {
        name: 'Jason Wang',
        // image: '',
      }
    ],
  },
  // {
  //   name: 'IT',
  //   members: [
  //     {
  //       name: '',
  //       image: '',
  //     },
  //   ]
  // },
]