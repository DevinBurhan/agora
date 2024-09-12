export const taskItems = [
  {
    value: 'Activity without Confirmation',
    label: <span>Activity without Confirmation</span>,
    voiceNotes: false,
    transcribeNotes: false,
  },
  {
    value: 'Activity with Confirmation',
    label: <span>Activity with Confirmation</span>,
    voiceNotes: false,
    transcribeNotes: false,
  },
  {
    value: 'Reference PDF',
    label: <span>Reference PDF</span>,
    voiceNotes: true,
    transcribeNotes: true,
  },
  {
    value: 'Reference Image',
    label: <span>Reference Image</span>,
    voiceNotes: true,
    transcribeNotes: true,
  },
  {
    value: 'Reference Video',
    label: <span>Reference Video</span>,
    voiceNotes: true,
    transcribeNotes: true,
  },
  {
    value: 'Take a Photo',
    label: <span>Take a Photo</span>,
    voiceNotes: true,
    transcribeNotes: true,
  },
  {
    value: 'Record Video',
    label: <span>Record Video</span>,
    voiceNotes: true,
    transcribeNotes: true,
  },
  {
    value: 'Record Voice Note',
    label: <span>Record Voice Note</span>,
    voiceNotes: false,
    transcribeNotes: true,
  },
  {
    value: 'Select from Options',
    label: <span>Select from Options</span>,
    voiceNotes: false,
    transcribeNotes: false,
  },
];

export const taskData = {
  data: [
    {
      id: 1,
      name: 'Finger dislocation surgery',
      desc: 'abcd efg hijk lmn opqr stuv wxyz',
      task: [
        { name: 'Revert the finger to normal position', type: 'Activity with confirmation' },
        { name: 'attach splint', type: 'Activity without confirmation' },
      ],
      created_at: '02-09-2024',
    },
  ],
  count: 1,
};
