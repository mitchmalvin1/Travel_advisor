import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating, isVoid }) => {
  const classes = useStyles();

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.header}>
        Restaurants, Hotels & Attractions around you
      </Typography>
      {
        isLoading ? (
          <div className={classes.loading}>
            <CircularProgress size="5rem" />
          </div>
        ) : (
          <>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.header}> Type</InputLabel>
              <Select
                value={type}
                className={classes.header}
                onChange={(e) => { setType(e.target.value) }}
                inputProps={{
                  classes: {
                    icon: classes.icon
                  }
                }}
              >
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.header}>Rating</InputLabel>
              <Select
                value={rating}
                className={classes.header}
                onChange={(e) => { setRating(e.target.value) }}
                inputProps={{
                  classes: {
                    icon: classes.icon
                  }
                }}
              >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>3.0 and above</MenuItem>
                <MenuItem value={4}>4.0 and above</MenuItem>
                <MenuItem value={4.5}>4.5 and above</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>

              {
                places?.map((place, i) => (
                  <Grid ref={elRefs[i]} item key={i} xs={12} >
                    <PlaceDetails
                      place={place}
                      selected={Number(childClicked) === i}
                      refProp={elRefs[i]}
                    />
                  </Grid>
                ))}
            </Grid>
          </>
        )}
    </div>
  )
}

export default List;






// import React, { useState, useEffect, createRef } from 'react';
// import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

// // import PlaceDetails from '../PlaceDetails/PlaceDetails';
// import useStyles from './styles.js';

// const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
//   // const [elRefs, setElRefs] = useState([]);
//   const classes = useStyles();


//   return (
//     <div className={classes.container}>
//       <Typography variant="h4">Food & Dining around you</Typography>
//       {isLoading ? (
//         <div className={classes.loading}>
//           <CircularProgress size="5rem" />
//         </div>
//       ) : (
//         <>
//           <FormControl className={classes.formControl}>
//             <InputLabel id="type">Type</InputLabel>
//             <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
//               <MenuItem value="restaurants">Restaurants</MenuItem>
//               <MenuItem value="hotels">Hotels</MenuItem>
//               <MenuItem value="attractions">Attractions</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl className={classes.formControl}>
//             <InputLabel id="rating">Rating</InputLabel>
//             <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
//               <MenuItem value="">All</MenuItem>
//               <MenuItem value="3">Above 3.0</MenuItem>
//               <MenuItem value="4">Above 4.0</MenuItem>
//               <MenuItem value="4.5">Above 4.5</MenuItem>
//             </Select>
//           </FormControl>
//           {/* <Grid container spacing={3} className={classes.list}>
//             {places?.map((place, i) => (
//               <Grid ref={elRefs[i]} key={i} item xs={12}>
//                 <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
//               </Grid>
//             ))}
//           </Grid> */}
//         </>
//       )}
//     </div>
//   );
// };

// export default List;