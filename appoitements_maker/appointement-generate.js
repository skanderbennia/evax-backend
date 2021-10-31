const { PythonShell } = require('python-shell');

const center_id = 1;
const appointments = [];

const options = {
  mode: 'text',
  pythonPath: '/usr/bin/python',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: '../appoitements_maker/',
  args: ['12/1/2021', '12/1/2021', '10:00:00', '11:00:00', 10, 20],
};

PythonShell.run('script.py', options, (err, results) => {
  if (err) throw err;
});
