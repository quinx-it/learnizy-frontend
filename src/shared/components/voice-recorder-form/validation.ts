import * as yup from 'yup';

const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30 MB

export const schema = yup.object({
  file: yup
    .mixed<Blob>()
    .required('Вы не записали вопрос.') 
    .test('fileSize', 'Запись слишком длинная (макс. 30MB)', (value) => {
      return value ? value.size <= MAX_FILE_SIZE : false;
    })
    .test('is-blob', 'Значение не является аудиофайлом', (value) => {
      return value instanceof Blob;
    }),
});