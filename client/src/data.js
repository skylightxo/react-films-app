import {generate as id} from "shortid"

const films = [
  {
    _id: id(),
    title: "Legend of the Seeker",
    director: "Stephen Tolkin",
    duration: 93,
    price: 48.3,
    img: "/img/seeker.jpg",
    featured: true,
    description:
      "After the mysterious murder of his father, a son's search for answers begins a momentous fight against tyranny.",
  },
  {
    _id: id(),
    title: "Gnomebook",
    director: "Murray Fahey",
    duration: 88,
    price: 31.2,
    img: "/img/gnomebook.jpg",
    featured: false,
    description:
      "A colourful array of characters compete at the Annual Australian Garden Gnome Convention. Once a year 2000 garden gnomes and 10,000 gnome carers gather in the sleepy mountain hamlet of Glenbrook, for the annual Gnome convention; the gnomes arrive by road, train, plane, foot and post",
  },
  {
    _id: id(),
    title: "Rise of the Legend",
    director: "Teng Bee",
    duration: 110,
    price: 55.2,
    img: "/img/rise.jpg",
    featured: false,
    description:
      "RISE OF THE LEGEND is a story about Lee Chong Wei, who was born in a poor family. He has the talent of playing badminton and went through a lot of difficulties with the spirit of never giving up, finally he becomes a national player.",
  },
 /* 
 {
    _id: id(),
    title: "Siji: Driver",
    director: "David Chai",
    duration: 88,
    price: 35.2,
    img: "/img/siji.jpg",
    featured: true,
    description:
      "After a driver rescues a passenger from an abusive boyfriend, he discovers she is a human trafficking victim. But in order to free her, he must give up the thing he loves the most.",
  },
  */
  /*
  {
    _id: id(),
    title: "Aquaman",
    director: "James Wan",
    duration: 112,
    price: 55.2,
    img: "/img/aquaman.jpg",
    featured: false,
    description:
      "Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land. ",
  },
  */
]

const fetchData = () => {
  return new Promise(resolve => setTimeout(() => resolve(films), 2000))
}

const genres = [
  {_id: 1, title: "family"},
  {_id: 2, title: "comedy"},
  {_id: 3, title: "drama"},
  {_id: 4, title: "horror"},
]

const tags = [
  {_id: 1, title: "battle"},
  {_id: 2, title: "anime"},
  {_id: 3, title: "parody"},
]

export {films, genres, tags, fetchData}

// {id: id(), title: '', director: '', duration: 121, price: 55.2, im: ''},
