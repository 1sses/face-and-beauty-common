const answers = {
  success: {
    registration: 'Регистрация выполнена успешно!',
    newRole: 'Ваша новая роль - ',
    login: 'Вход выполнен успешно!',
    activation: 'Активация аккаунта выполнена успешно!',
    logout: 'Выход выполнен успешно!',
    create: {
      employee: 'Сотрудник успешно добавлен!',
      service: 'Услуга успешно добавлена!',
      message: 'Сообщение успешно отправлено!',
      appointment: 'Вы успешно записаны к специалисту!'
    },
    update: {
      employee: 'Информация успешно обновлена!',
      service: 'Услуга успешно обновлена!'
    },
    delete: {
      employee: 'Сотрудник успешно удален из базы данных!',
      service: 'Услуга успешно удалена!',
      message: 'Сообщение успешно удалено!',
      appointment: 'Заказ успешно удален!'
    },
    change: {
      name: 'Имя успешно изменено!',
      status: 'Changing status was successfully',
      avatar: 'Фото профиля успешно изменено!',
      email: 'Email успешно изменен!',
      password: 'Пароль успешно изменен!'
    }
  },
  error: {
    accessDenied: 'Доступ запрещен!',
    unavailableEmail: 'Недоступный email',
    incorrectCredentials: 'Неверный логин или пароль',
    impossiblePassword: 'Невозможный пароль',
    impossibleEmail: 'Невозможный email',
    nonExistentEmail: 'Данный email не существует!',
    unableAppendOrder: 'Невозможно записаться на текущую дату! Пожалуйста, выберите корректную дату!'
  }
}

module.exports = { answers }
