const mongoose = require('mongoose');

const port = 8082;
const app = require('./app');

mongoose.connect('mongodb+srv://harsha733084:4AIcDBPqoyMdmb0h@loanapp.i8dcg.mongodb.net/?retryWrites=true&w=majority&appName=loanapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`));
    console.log('MongoDB Connected...')})
.catch(err => console.log(err));