import TelegramApi from "node-telegram-bot-api";
// подключаем node-telegram-bot-api
const token = "5296444275:AAGkXQhObvu_4N-_oyMLmwtfjtCuwjx4-Ao"; // тут токен кторый мы получили от botFather
// включаем самого бота
const bot = new TelegramApi(token, { polling: true });

// Команды для бота
bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
  { command: "/info", description: "Информация о боте" },
  { command: "/menu", description: "Главное меню" },
]);

// конфиг клавиатуры 'Вы можете зайти в Главное меню или позвонить'
const startkeyboard = [
  [{ text: "Перейти в Главное меню", callback_data: "menu" }],
];

const keyboardMainMenu = [
  [
    { text: "О Пофсоюзе и ППО" },
    { text: "Порядок вступления в ППО" },
    { text: "Коллективный договор" },
  ],
  [{ text: "Устав" }, { text: "ДМС" }, { text: "Охрана труда" }],
  [
    { text: "Материальная помощь" },
    { text: "Юридическая помощь" },
    { text: "Общественная жизнь" },
  ],
  [
    { text: "Поддержка молодёжи и ветеранов" },
    { text: "Статьи и публикации" },
    { text: "Ссылки на официальные источники" },
  ],
];

// Действия бота при нажатии на кнопки клавиатуры
bot.on("callback_query", async (msg) => {
  const { data } = msg;
  const chatId = msg.message.chat.id;
  if (data === "getContact") {
    await bot.sendMessage(
      chatId,
      '<a href="tg://msg?to=+79676050713"> Отправить письмо по электронной почте</a>',
      { parse_mode: "HTML", disable_web_page_preview: "true" }
    );
  }
  if (data === "menu") {
    await bot.sendMessage(chatId, "Клавиатура Главного меню открыта", {
      reply_markup: {
        keyboard: keyboardMainMenu,
        remove_keyboard: true,
      },
    });
  }
});

// Действия бота при отправленных ему сообщениях
bot.on("message", async (msg) => {
  const { text } = msg;
  const chatId = msg.chat.id; // получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал
  const imgYunia = "yuniya.png";
  const imgMenuButton = "MenuButton.png";
  const imgMenuButton2 = "MenuButton2.png";
  if (text === "/start") {
    await bot.sendPhoto(chatId, imgYunia, { width: "50%", height: "50%" });
    await bot.sendMessage(
      chatId,
      `Здравствуйте, ${msg.from.first_name}! Я - Юния, Ваш бот-помощник. Расскажу о работе ППО и отвечу на Ваши вопросы.`
    );
    await bot.sendMessage(
      chatId,
      "Для того, чтобы выбрать интересующую Вас тему, перейдите в Главное меню",
      {
        reply_markup: {
          inline_keyboard: startkeyboard,
        },
      }
    );
  }
  if (text === "/info") {
    await bot.sendMessage(
      chatId,
      'Бот разработан @saturn_i_anka специально для Первичной Профсоюзной организации "Красноярская ТЭЦ-3" для ответов на самые распространённые вопросы по работе ППО.'
    );
  }
  if (text === "/menu") {
    await bot.sendMessage(
      chatId,
      "Если Вы пользуетесь мобильной версией Telegram - Главное меню откоется автоматически. Если Вы пользуетесь версией для ПК: при нажатии на кнопку"
    );
    await bot.sendPhoto(chatId, imgMenuButton, { width: "50%", height: "50%" });
    await bot.sendMessage(
      chatId,
      "откроется Главное меню, Вы сможете выбрать интересующую тему и получить подробную информацию."
    );
    await bot.sendMessage(chatId, "А если Вы нажмёте на кнопку");
    await bot.sendPhoto(chatId, imgMenuButton2, {
      width: "50%",
      height: "50%",
    });
    await bot.sendMessage(
      chatId,
      "то сможете заново запустить стартовое сообщение, узнать информацию о боте и восстановить кнопку Главного меню, если вдруг она пропала.",
      {
        reply_markup: {
          keyboard: keyboardMainMenu,
        },
      }
    );
  }
  if (text === "О Пофсоюзе и ППО") {
    await bot.sendMessage(
      chatId,
      "<b>🔵 Первичная профсоюзная организация. 🔵</b>",
      {
        parse_mode: "HTML",
      }
    );
    await bot.sendMessage(
      chatId,
      "<b>Целями и задачами профсоюза</b> являются: выявление, представительство и защита социально-трудовых прав и интересов своих членов. Участие в формировании и реализации социальных программ, обеспечивающих достойный уровень жизни и благоприятные условия труда и быта своих членов профсоюза и их семей.",
      {
        parse_mode: "HTML",
      }
    );
    await bot.sendMessage(
      chatId,
      "<b>❗ НЕТ ПРОФСОЮЗА - НЕТ ТРУДОВЫХ ГАРАНТИЙ!</b>",
      {
        parse_mode: "HTML",
      }
    );
    await bot.sendMessage(
      chatId,
      'Профсоюз - законный представитель человека труда. Он представляет интересы как одного отдельно взятого работника, так и всего трудового коллектива в целом. Чаще всего именно на предприятиях, где нет профсоюзной организации, или она немногочисленная, выдается "серая" зарплата, сокращается отпуск, укрываются несчастные случаи и т.д. Отсутствие профсоюзной организации на предприятии - это тревожный сигнал. Надо работать там, где есть профсоюз. Ведь у профсоюза есть законодательные инструменты защиты социально-экономических интересов членов профсоюза!'
    );
    await bot.sendMessage(
      chatId,
      "<b>🔵 С мнением профсоюза считаются при разработке нормативно-правовых актов на всех уровнях власти. 🔵</b>",
      { parse_mode: "HTML" }
    );
    await bot.sendMessage(
      chatId,
      "Профсоюз защищает перед бизнесом и властью ваши трудовые права и социальные гарантии. Интересы членов профсоюза активно защищаются в:"
    );
    await bot.sendMessage(chatId, "✅ Общественной палате");
    await bot.sendMessage(chatId, "✅ Государственной Думе РФ");
    await bot.sendMessage(chatId, "✅ Российской трёхсторонней комиссии и др.");
    await bot.sendMessage(
      chatId,
      'На сегодняшняшний день более 400 работников предприятия объединились в <b>Первичную профсоюзную организацию "Красноярская ТЭЦ-3"</b>. Председатель - Клименкова Светлана Яновна. Наша первичка входит в состав Красноярской краевой организации Общественной организации "Всероссийский Электропрофсоюз (сокр. - КрасКО ВЭП, председатель – Краева Людмила Ивановна), который в свою очередь входит в состав Общественной организации «Всеросийский Электропрофсоюз» (председатель – Офицеров Юрий Борисович).',
      { parse_mode: "HTML" }
    );
  }
  if (text === "Порядок вступления в ППО") {
    const statement1 = "./Заявление_1.doc";
    const statement2 = "./Заявление_2.docx";
    await bot.sendMessage(chatId, "<b>🔵 КАК ВСТУПИТЬ В ПРОФСОЮЗ? 🔵</b>", {
      parse_mode: "HTML",
    });
    await bot.sendMessage(
      chatId,
      "Только став членом профсоюза, вы вместе с другими работниками сможете полноценно и эффективно защищать свои интересы!"
    );
    await bot.sendMessage(
      chatId,
      "Цель профсоюзов - добиться лучшего для работников: зарплаты - выше, условий труда - безопаснее, отдыха - комфортнее, жизни - насыщеннее и успешнее!"
    );
    await bot.sendMessage(
      chatId,
      'Для того, чтобы вступить в Профсоюз, необходимо заполнить 2 заявления: на вступление в ППО и на удержание профсоюзного взноса - 1% с начисленной заработной платы. С заявлениями обратиться к председателю ППО - <a href="">Клименковой Светлане Яновне</a> (БЩУ каб.43, тел.: 63-940, +7(905)976-88-12) или к представителям ППО в цехах.',
      { parse_mode: "HTML" }
    );
    await bot.sendMessage(chatId, "Образцы заявлений:");
    await bot.sendDocument(chatId, statement1);
    await bot.sendDocument(chatId, statement2);
    await bot.sendMessage(
      chatId,
      " <i>❗ВНИМАНИЕ❗ Заявление об удержании из заработной платы членских профсоюзных взносов пишется от руки!</i> ",
      { parse_mode: "HTML" }
    );
    await bot.sendMessage(
      chatId,
      " <b>Вместе мы - сила!</b> Чем больше работников предприятия состоят в профсоюзе, тем весомее его голос при решении важных вопросов и защите работников!",
      { parse_mode: "HTML" }
    );
  }
  if (text === "Коллективный договор") {
    const collectiveAgreement1 =
      "./Коллективный_договор_ЕТГК_2021-2023г.г..pdf";
    const collectiveAgreement2 = "./Дополнительное_соглашение_№1.pdf";
    const collectiveAgreement3 = "./Дополнительное_соглашение_№2.pdf";
    await bot.sendMessage(
      chatId,
      "<b>🔵 ПРОФСОЮЗ ЗАКЛЮЧАЕТ КОЛЛЕКТИВНЫЙ ДОГОВОР 🔵</b>",
      {
        parse_mode: "HTML",
      }
    );
    await bot.sendMessage(
      chatId,
      "Профсоюз - представитель работников при проведении коллективных переговоров по заключению, изменению Коллективного договора - основного правового акта, регулирующего трудовые отношения в организации, которым устанавливаются (регулируются):"
    );
    await bot.sendMessage(chatId, "✅ формы, системы и размеры оплаты труда;");
    await bot.sendMessage(chatId, "✅ денежные вознаграждения и доплаты;");
    await bot.sendMessage(chatId, "✅ индексация заработной платы;");
    await bot.sendMessage(chatId, "✅ режим рабочего времени и отдыха;");
    await bot.sendMessage(chatId, "✅ кадровая политика и занятость;");
    await bot.sendMessage(chatId, "✅ вопросы быта работников;");
    await bot.sendMessage(
      chatId,
      "✅ работа с молодёжью и поддержка ветеранов;"
    );
    await bot.sendMessage(chatId, "✅ пособия и компенсации;");
    await bot.sendMessage(chatId, "✅ охрана труда;");
    await bot.sendMessage(
      chatId,
      "✅ организация оздоровления трудящихся и их детей;"
    );
    await bot.sendMessage(
      chatId,
      "✅ организация отдыха и другие важнейшие вопросы."
    );
    await bot.sendDocument(chatId, collectiveAgreement1);
    await bot.sendDocument(chatId, collectiveAgreement2);
    await bot.sendDocument(chatId, collectiveAgreement3);
  }
  if (text === "Охрана труда") {
    await bot.sendMessage(
      chatId,
      "<b>🔵 ПРОФСОЮЗ ОСУЩЕСТВЛЯЕТ ОБЩЕСТВЕННЫЙ КОНТРОЛЬ В СФЕРЕ ОХРАНЫ ТРУДА 🔵</b>",
      { parse_mode: "HTML" }
    );
    await bot.sendMessage(
      chatId,
      "Технические инспекторы труда Электропрофсоюза, члены Профкома, представители профсоюза в комиссиях по охране труда и уполномоченные лица по охране труда осуществляют непрерывный общественный контроль за охраной труда на предприятии."
    );
    await bot.sendMessage(
      chatId,
      "Электропрофсоюз проводит обучение уполномоченных лиц по охране труда, повышение квалификации инспекторов по охране труда для отстаивания интересов членов профсоюза. Членам профсоюза и их семьям гарантирована защита и объективность при расследовании несчастных случаев на производстве и профессиональных заболеваний, по вопросам возмещения труда, причиненного их здоровью на производстве."
    );
  }
  if (text === "Ссылки на официальные источники") {
    await bot.sendMessage(
      chatId,
      "<b>🔵 ССЫЛКИ НА ОФИЦИАЛЬНЫЕ ИСТОЧНИКИ 🔵</b>",
      {
        parse_mode: "HTML",
      }
    );
    await bot.sendMessage(
      chatId,
      '➡<a href="https://t.me/+QEZ6OQwQdHM3ZWNi"> Telegram-канал ППО "Красноярская ТЭЦ-3"</a>',
      { parse_mode: "HTML", disable_web_page_preview: "true" }
    );
    await bot.sendMessage(
      chatId,
      '➡<a href="https://t.me/+eUVNI69dgukyNjIy"> Чат для общения ППО "КРАСНОЯРСКАЯ ТЭЦ-3"</a>',
      { parse_mode: "HTML", disable_web_page_preview: "true" }
    );
    await bot.sendMessage(
      chatId,
      '➡<a href="http://kr-elprof.ru/"> Сайт Красноярской краевой организации Общественной организации "Всероссийский Электропрофсоюз"</a>',
      { parse_mode: "HTML", disable_web_page_preview: "true" }
    );
    await bot.sendMessage(
      chatId,
      '➡<a href="https://t.me/elprofonline"> Всероссийский Электропрофсоюз (Telegram-канал)"</a>',
      { parse_mode: "HTML", disable_web_page_preview: "true" }
    );
    await bot.sendMessage(
      chatId,
      '➡<a href="https://vk.com/electrictradeunion"> Всероссийский Электропрофсоюз (ВКонтакте)"</a>',
      { parse_mode: "HTML", disable_web_page_preview: "true" }
    );
    await bot.sendMessage(
      chatId,
      '➡<a href="https://www.youtube.com/channel/UCNZ4S-umLGk-t-NanNBUnaw/videos"> Всероссийский Электропрофсоюз (YOUTUBE)"</a>',
      { parse_mode: "HTML", disable_web_page_preview: "true" }
    );
  }
  if (text === "Поддержка молодёжи и ветеранов") {
    await bot.sendMessage(
      chatId,
      "<b>🔵 ПРОФСОЮЗ ПОДДЕРЖИВАЕТ МОЛОДЁЖЬ И ВЕТЕРАНОВ 🔵</b>",
      {
        parse_mode: "HTML",
      }
    );
    await bot.sendMessage(
      chatId,
      "Профсоюз уделяет большое внимание работе с молодёжью, инициирует создание и поддерживает деятельность молодёжных и ветеранских организаций на предприятии. В Коллективный договор включаются разделы, предусматривающие дополнительные социальные гарантии для молодёжи и ветеранов."
    );
    await bot.sendMessage(
      chatId,
      'На Красноярской ТЭЦ-3 по вопросам работы Молодёжного совета можете обращаться к Председателю МС ППО "Красноярская ТЭЦ-3" Анне Вельк @saturn_i_anka (БЩУ каб.43, тел.: 63-933)'
    );
  }
  if (text === "Статьи и публикации") {
    await bot.sendMessage(
      chatId,
      "<b>🔵 ССЫЛКИ НА СТАТЬИ И ПУБЛИКАЦИИ 🔵</b>",
      {
        parse_mode: "HTML",
      }
    );
    await bot.sendMessage(
      chatId,
      '<a href="https://sibgenco.online/news/element/lider-kraevoy-organizatsii-vserossiyskogo-eletroprofsoyuza-kazhdyy-zanyatyy-v-otrasli-dolzhen-byt-s-/">Интервью с председателем КрасКо ВЭП Краевой Людмилой Ивановной</a>',
      { parse_mode: "HTML", disable_web_page_preview: "true" }
    );
  }
  if (text === "ДМС") {
    const applicationAmi1 =
      "./ЗАЯВКА_на_гарантийное_письмо_на_получение_ДМС.xlsx";
    const applicationAmi2 =
      "./Согласие_на_обработку_персональных_данных_к_дог_ДМС.docx";
    const applicationAmi3 = "./Список_ЛПУ_к_дог_ДМС_2022_2023.docx";
    await bot.sendMessage(chatId, "<b>🔵 ДОГОВОР ДМС НА 2022-2023 ГГ. 🔵</b>", {
      parse_mode: "HTML",
    });
    await bot.sendMessage(
      chatId,
      "Вступил в силу договор Добровольного медицинского страхования для работников филиала «Красноярская ТЭЦ-3», который будет действовать до конца августа 2023 года. Комиссией по льготам, гарантиям и компенсациям определена сумма на одного застрахованного работника: - члена первичной-профсоюзной организации в размере 8 000 руб. - работников, не являющихся членами в размере 5 000 руб. Обращаю Ваше внимание на то, что сумма по договору ДМС на одного застрахованного работника увеличиваться не будет на всем протяжении действия вышеуказанного договора. Гарантийное письмо направляется в лечебное учреждение в течение 2 (двух) рабочих дней с момента получения информации куратором в «СОГАЗ» и действует 14 календарных дней! При обращении в лечебное учреждение с собой необходимо иметь паспорт. В соответствии с данным договором работники имеют возможность получить амбулаторно-поликлиническую (прием врачей-консультантов различных специальностей, лабораторная диагностика, инструментальные методы исследования) и стационарную помощь. Медицинскими услугами можно будет воспользоваться в клиниках, включенных в «Список ЛПУ»."
    );
    await bot.sendDocument(chatId, applicationAmi1);
    await bot.sendDocument(chatId, applicationAmi2);
    await bot.sendDocument(chatId, applicationAmi3);
  }
  if (text === "Устав") {
    const regulationDoc = "./Устав_ВЭП_2021.pdf";
    await bot.sendMessage(
      chatId,
      '<b>🔵 Устав Общественной организации "Всероссийский Электропрофсоюз" 🔵</b>',
      { parse_mode: "HTML" }
    );
    await bot.sendDocument(chatId, regulationDoc);
  }
  if (text === "Материальная помощь") {
    const financialAssistance = "./Положение.pdf";
    const approvalF = "./Согласие_обработка_перс_данных.docx";
    const statementF1 = "./Заявление_мат_помощь_мобилизация.docx";
    const statementF2 = "./Заявление_мат_помощь_на_рождение.pdf";
    const statementF3 = "./Заявление_мат_помощь_образец.docx";
    await bot.sendMessage(
      chatId,
      "<b>🔵 Профсоюз предоставляет помощь членам профсоюза, попавшим в трудную жизненную ситуацию 🔵</b>",
      { parse_mode: "HTML" }
    );
    await bot.sendMessage(
      chatId,
      "Каждый член профсоюза имеет право на материальную помощь в случае возникновения тяжелых жизненных обстоятельств, на приобретение медицинских препаратов, проведение операций и других случаях."
    );
    await bot.sendMessage(
      chatId,
      'Полный перечень видов материальной помощи Вы можете посмотреть в "Положении о порядке предоставления материальной помощи членам профсоюза Первичной профсоюзной организации "Красноярская ТЭЦ-3" '
    );
    await bot.sendDocument(chatId, financialAssistance);
    await bot.sendMessage(
      chatId,
      "С этого года материальная помощь переводится на банковскую карту, поэтому, помимо заявления на материальную помощь (пишется от руки), необходимо заполнить согласие на обработку персональных данных (распечатать и заполнить)."
    );
    await bot.sendMessage(chatId, "Образцы заявлений:");
    await bot.sendDocument(chatId, approvalF);
    await bot.sendDocument(chatId, statementF1);
    await bot.sendDocument(chatId, statementF2);
    await bot.sendDocument(chatId, statementF3);
  }
  if (text === "Юридическая помощь") {
    await bot.sendMessage(
      chatId,
      "<b>🔵 Профсоюз оказывает бесплатную юридическую помощь по социально-трудовым вопросам 🔵</b>",
      { parse_mode: "HTML" }
    );
    await bot.sendMessage(chatId, "Членам профсоюза оказываются:");
    await bot.sendMessage(chatId, "✅ бесплатная юридическая защита и помощь");
    await bot.sendMessage(
      chatId,
      "✅ консультации правового инспектора труда по правовым вопросам"
    );
  }
  if (text === "Общественная жизнь") {
    await bot.sendMessage(
      chatId,
      "<b>🔵 Профсоюз - это насыщенная общественная жизнь трудового коллектива 🔵</b>",
      { parse_mode: "HTML" }
    );
    await bot.sendMessage(
      chatId,
      "Профсоюз является инициатором проведения и организатором большого количества культурно-массовых мероприятий, спортивно-оздоровительных мероприятий как на уровне предприятий, так и на краевом уровне."
    );
    await bot.sendMessage(
      chatId,
      'Члены ППО "Красноярская ТЭЦ-3" принимают участие в различных мероприятиях, например, Брейн-Ринг по охране труда, соревнования по пейнтболу, семейные старты, отдых на Мане и др.'
    );
  }
});
