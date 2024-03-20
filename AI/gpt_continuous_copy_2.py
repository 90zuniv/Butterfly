import openai
import os
import re
import dotenv
dotenv.load_dotenv()


from contents_analysis_final import contents_anal

# 영상분석
caption_txt, script_txt =contents_anal()

# 프롬프팅
openai_key= os.getenv('yj1_api')
total_tokens_used = 0

# 현재 대화 토큰 개수
def estimate_token_count(text):
    return len(text) // 4

# 총 대화 토큰 갯수
def update_total_tokens(estimated_tokens):
    global total_tokens_used
    total_tokens_used += estimated_tokens

# 번역 GPT
def translate_text(text, target_language, model="gpt-3.5-turbo-0125"):
    openai.api_key = openai_key

    translation_prompt = f"Translate the following text to {target_language}:\n\n{text}"
    response = openai.Completion.create(
        model=model,
        prompt=translation_prompt,
        max_tokens=250
    )

    translated_text = response.choices[0].text.strip()
    estimated_tokens = estimate_token_count(translation_prompt + translated_text)
    update_total_tokens(estimated_tokens)

    return translated_text

# 다음 답변 받아오기
def chat_with_gpt(messages, model="gpt-4-turbo-preview", stop_sequences=None):
    openai.api_key = openai_key

    request_data = {
        "model": model,
        "messages": messages,
        "max_tokens": 300,
        "temperature": 0.1,
        # "top_p": 1, # ??
        "stop": stop_sequences
    }

    response = openai.chat.completions.create(**request_data)
    response_text = response.choices[0].message.content
    print(response_text)

    messages.append({"role": "assistant", "content": response_text})
    estimated_tokens = estimate_token_count(response_text)
    update_total_tokens(estimated_tokens)

    return response_text, messages




# 피드백
feedback={
    'Recast': 'S: Have you meet her brother? T: Have you met her brother? (recast)',
    'Explicit correction' : 'S: Have you meet her brother? T: Come on, you are not gonna say "Have you meet." tshould be "Have you met... Have you met her brother?"',
    'Elicitation':'Eliciting the correct form from the learner without providing It.'' S: She got catched by.. T: She got...[tpause] (elicitation) S:caught.',
    'Metalinguistic feedback': 'Providing metalinguistic information about the error' 'S: I have saw this car. T: Please be careful when you say "have." You need the past I participle here. (metalinguistic feedback)',
    'Clarification requests': 'S:I like to study psychoLOGY. T: Sorry? You like to study WHAT? (clarification request)',
    'Repetition':'S:so tired. I sleep for 2 hours only. T: I sleep?(repetition)"'
}
selected_feedback = input(f'Choose the type of feedback you want.\n{feedback.keys()}')

#레벨
level= {

    'A1':"""
            A1 adjectives and adverbs

            Adjectives vs adverbs, word formation, word order i.e. good vs well, quick vs quickly
            Comparative of adjectives with -er and more, i.e. happier, more comfortable
            Superlative of adjectives with -est and the most, i.e. the happiest, the most comfortable
            A1 articles and quantifiers

            A, An, The, 0 article i.e. I am a singer. I have an orange. I have books. I feel love.
            Superlative of adjectives i.e. the best, the most interesting
            A1 conditionals

            Zero conditional i.e. If you are ill, go to the doctor.
            A1 future tenses: 

            Future with will: sudden decision i.e. I will help you with that. 
            Future with going to: making plans i.e. I am going to see my sister for Christmas.
            Will for asking for help i.e. Will you carry my bag, please?
            A1 gerund and infinitive: 

            Verbs followed by infinitive or gerund (like, love, want, would like, etc.) i.e. I like reading. I want to see my family. I love singing. 
            Stative verbs i.e. know, like, seem, love, have, want, see, etc. 
            A1 past tenses:

            Past simple: actions in the past i.e. I worked last night. I didn’t work. 
            Past simple of TO BE, i.e. I was, You were, She was, He was, It was, We were, You were, They were
            Past simple: regular and irregular verbs i.e. I visited London in 1998. I went to see a film yesterday.
            A1 modal verbs:

            Can or can’t for abilities i.e. I can’t swim. I can cook. 
            Past simple of can or can’t for abilities i.e. I could swim when I was five. I couldn’t sing as a child. 
            Polite request with could and couldn’t i.e. Could you help me to find the purse? Couldn’t you be quicker?
            Obligation with must and mustn’t i.e. I must study. You mustn’t clean the dishes. 
            Prohibition with mustn’t i.e. You mustn’t smoke around children. 
            The necessity with need and needn’t i.e. You need to finish by 5 p.m. You needn’t hurry. 
            Needn’t for permissions i.e. Do I need to wear a uniform?
            Can for asking for permission i.e. Can I bring my dog to work?
            Can for possibility i.e. I can see you after work. 
            Shall for suggestions i.e. Shall I walk you to work?
            A1 prepositions:

            Prepositions of place: at, in on, in front of, under, behind, among, beside, near, next to, between, across, into, through, onto, out of, etc. 
            By, of, etc.
            A1 pronouns:

            Personal pronouns i.e. I, he, she, he, it, we you, they
            Possessive pronouns i.e. my, your, his, her, its, our, your, their
            Possessive with ‘s i.e. Paul’s daughter, my sister’s house
            Object pronouns i.e. me, you, him, her, it, us, you, them
            Demonstrative pronouns i.e. that, those, this, these
            Pronouns: something, anything
            A1 present tenses:

            HAVE GOT, positive, negative, question, i.e. I have got blond hair. She has got a car.
            HAVE, i.e. I have breakfast at 8 every day. She has dinner with her family.
            TO BE, i.e. I am, You are, He is, She is, It is, We are, You are, They are
            There is, There are, i.e. There is a book on the table, There are books on the table.
            Present simple for habits and daily routines, i.e. I wake up at 8 every day. 
            Adverbs of frequency: always, never, often, seldom, usually, etc. I usually drink coffee for breakfast. I never drink alcohol.
            Present progressive: actions happening now, i.e. I am working now. She is swimming now.
            Present perfect with since and for, i.e. I have lived alone since 2000. She has studied for the exam for 4 years.
            Present perfect with ever and never, i.e. I have never smoked. Have you ever been to Britain?
            Present perfect with already and yet, i.e. I haven’t been to Europe yet. I have already done that.
            Imperative, i.e. Stand up! Do this!
            A1 questions:

            Interrogative pronouns: Where, Whose, When, Who, How long, Whose, How, What time, Which, What, i.e. How is she? Where do you live? What time is your concert? Whose book is this?
            Forming questions with TO BE i.e. Are they relatives? Is she a singer?
            Forming questions with HAVE GOT i.e. Have you got a car? Has she got a dog?
            Forming questions with Present simple i.e. Are you happy? Do you speak English? Do you speak English?
            Forming questions with Past simple i.e. Did he do it? Was he at home last night? Did you work?
            Question tags i.e. She is Spanish, isn’t she? They are coming, aren’t they? He isn’t Irish, is he?
            A1 vocabulary:

            Personal information, daily routines, my typical day at home, at work, talking about experiences, my house, my flat, my country, daily routines, my family, my likes and dislikes, my school, my past experiences with past simple and present perfect, my favourite food, verb phrases, word formations, places and buildings
            """,
    'A2':"""
            A2 adjectives and adverbs

            Adjectives vs adverbs, word formation, word order i.e. quick vs quickly, sudden vs suddenly, bad vs badly.
            Comparative of adjectives with -er and more i.e. older, more expensive 
            Superlative of adjectives with -est and the most i.e. the biggest, the most interesting
            Irregular adjectives:  less, good, bad, more
            The use of than, i.e. She is a better driver than me. 
            Adverbial phrases of time, place and frequency – including word order
            A2 articles and quantifiers

            A, An, The, 0 article i.e. a book, an orange, the book, the students, students, etc. 
            Superlative of adjectives with the best, the most i.e. He is the best man I have ever met. This is the most interesting book I have ever read. 
            A2 conditionals

            Zero conditional i.e. Take medicine if you feel ill. 
            First conditional i.e. If it rains tomorrow, I will stay home. 
            First conditional with unless, if only i.e. I will come unless you cancel. If only my boyfriend knew.
            Wish i.e. I wish I was taller. I wish it wasn’t true. 
            A2 conjunctions

            where, when, whose, why, whose, who, that
            Basic compound sentences i.e. I went out when it was raining. She is the woman who can speak five languages. Emma lives in a house that is 100 years old.
            A2 future tenses: 

            Future with will: sudden decision i.e. I will show you how to use the new laptop. 
            Future with going to i.e. Sarah is going to sell her car. 
            Present simple for future i.e. The plane leaves at 8. 
            Present progressive for future plans i.e. He is not working tomorrow. 
            Will for asking for help i.e. Will you do it for me?
            Shall for suggestions i.e. Shall we go for a walk? 
            A2 gerund and infinitive: 

            Verbs followed by infinitive or gerund i.e. want, plan, decide, try, hope, expect, offer, forget, need, promise, refuse, learn, etc.
            Stative verbs i.e. like, know, belong, love, hate, suppose, mean, want, understand, seem, prefer, etc.  
            A2 modal verbs:

            Can or can’t for abilities i.e. I can play tennis. I can’t speak Spanish. 
            Past simple of can or can’t for abilities i.e . She could paint before she started school. I couldn’t cook until I went to university.
            Polite request with could and couldn’t i.e. Could you post this letter for me?
            Obligation with must i.e. I must clean. You must carry your ID at all times.
            Prohibition with mustn’t i.e. I mustn’t be late. You mustn’t smoke here. 
            Have to for obligations in present and past i.e. I have to take my medicine. I had to see my boss last night. I had to go to the dentist. 
            Must vs have to i.e. I must eat something. I have to pass an English test. 
            Necessity with need and needn’t and have to i.e. You need to study. You needn’t go yet. 
            Needn’t for permissions i.e. You needn’t wear glasses. 
            Can for asking for permission i.e. Can I leave now?
            Can for possibility i.e. Can I open that door, please?
            Shall for suggestions i.e. Shall we see your parents next week?
            Should for giving advice i.e. You should sleep more. You shouldn’t work so much.
            A2 past tenses:

            Past simple: actions in the past i.e. I worked last night. I didn’t work. Did you work?
            Past simple of TO BE, i.e. I was, You were, She was, He was, It was, We were, You were, They were
            Past simple: regular and irregular verbs i.e. I visited London in 1998. I went to see a film yesterday.
            Past progressive i.e. I was watching the game. She was working for hours. 
            Past progressive action interrupted by past simple i.e. I was playing basketball when the phone rang. She was cooking when we came.
            Major irregular verbs.
            A2 prepositions:

            Prepositions of place: at, in on, in front of, under, behind, among, beside, near, next to, between, across, into, through, onto, out of, etc. 
            Prepositions of time: on, in, for, at, etc.
            Prepositional phrases: on foot, etc. 
            By, Of, With
            A2 present tenses:

            TO BE, i.e. I am, You are, He is, She is, It is, We are, You are, They are
            There is, There are, i.e. There is a book on the table. There are books on the table.
            HAVE GOT, positive, negative i.e. She has got two sisters. I haven’t  got a house. 
            HAVE i.e. I have blue eyes. Our house doesn’t have five bedrooms. 
            Present simple for habits and daily routines i.e. I never drink coffee in the morning. I never drink and drive. I usually visit my family for holidays. 
            Present simple for future i.e. The bank is open from 8 o’clock.The concert starts at 7 p.m.
            Adverbs of frequency: always, never, often, seldom, usually i.e. I often go to the farmers’ market. I often watch romantic movies. 
            Word order of sentences with adverbs i.e. She ate quickly. He played brilliantly. 
            Present progressive: actions happening now i.e. She is washing the car now. He is singing. 
            Present progressive for future i.e. I am seeing my mother tonight. She is coming tomorrow. 
            Present perfect with since and for i.e. I have been learning English for seven years. I have lived here since 2001. 
            Present perfect with ever and never i.e. Have you ever been to the USA? I have never flown before. 
            Present perfect with already and yet i.e. I have already done my homework. I haven’t spoken to my boss yet. Have you drunk your tea yet?
            A2 pronouns:

            Personal pronouns: I, he, she, he, it, we you, they
            Possessive pronouns: my, your, his, her, his, its, our, your, their
            Possessive with ‘s i.e. Tom’s diner, Susan’s song 
            Object pronouns: me, you, him, her, it, us, you, them
            Demonstrative pronouns: that, those, this, these
            Pronouns: something, anything
            Reflexive pronouns: myself, himself, herself, etc.
            A2 questions:

            Interrogative pronouns: Where, Whose, When, Who, How long, Whose, How, What time, Which, What, i.e. Who said that? How are you? Whose shoes are these? What time is your lesson? 
            Forming questions with TO BE i.e. Are you happy? Is she your sister? 
            Forming questions with HAVE GOT i.e. Have you got a green car? Has she got a cat?
            Forming questions with Present simple, progressive i.e. Do you speak Spanish? Are you wearing a hat? 
            Forming questions with Past simple, progressive i.e. Did you work last night? Were you working last night?
            Forming questions with Present perfect i.e. Have you ever been to New York?
            Question tags i.e You have a cat, don’t you? She is American, isn’t she? 
            A2 vocabulary:

            Phrasal verbs: Common phrasal verbs: get up, put on, come in, etc.
            jobs, do vs make, family, occupations, travelling, everyday activities, eating out, adjectives, health and medicine, nature, gadgets, technology, containers for food, clothes, parts of body, animals, weather, say vs tell
            """,
    'B1':"""
            B1 adjectives and adverbs

            Adjectives with -ed vs -ing, i.e. boring vs bored, tiring vs tired, shocking vs shocked etc. 
            Adverbs of frequency – always, never, seldom, sometimes, often, rarely, occasionally, etc.
            Word order of adverbs of frequency i.e. I never smoke. I am never late. 
            Comparative and superlative of irregular adjectives i.e. little – less – the least
            Same as, the same i.e. Laura gets the same salary as me. You’re just the same as your mother.
            As… as i.e. He isn’t as old as he looks. It’s not as cold.
            Like, alike, slightly i.e. You look like your mother, They look alike. She is slightly taller than me
            B1 conditionals

            0  conditional i.e. If people eat too much, they get fat quickly. 
            1st conditional i.e. If you are late, I will be angry.
            2nd conditional i.e. If they had time, they would go on holiday.
            3rd conditional i.e. We would have won if we had played better.
            B1 conjunctions

            Connecting words expressing cause and effect and contrast: so, which, until, why, while, when, as, before, after, until, as long as, whenever, etc.
            B1 future tenses: 

            Will – sudden decisions i.e. I will phone tomorrow. I will carry it for you. 
            Future progressive i.e. Will you be going away this summer?
            Going to – for plans i.e. I am going to give you a call soon.
            Passive voice i.e. The report will be done by tomorrow. 
            B1 gerund and infinitive: 

            Verbs followed by infinitive i.e. want, hope, need, plan, expect, promise, decide, offer, refuse, try, forget, learn, would like, etc.
            Verbs followed by gerund i.e. enjoy, mind, finish, suggest, etc.
            Verbs followed by infinitive or gerund i.e. stop
            Forming nouns from verbs using – ing, i.e. swim – swimming, talk – talking
            B1 modal verbs:

            may, might for probability i.e. I might go to the cinema. It may be late now. 
            May, might for polite request i.e. May I sit here? Might I ask you something?
            Can, can’t in past i.e. She can’t have seen me. She can have left the purse on the table. 
            Can for polite request i.e. Can you change my room, please?
            Can for probability i.e. We can ask her again.
            Could for ability i.e.  He couldn’t dance at all until he took lessons.
            Could for probability i.e. Alcohol could cause cancer. 
            Must vs have to i.e. You must clean your clothes. I have to go to the dentist. 
            Must/can’t for deduction i.e. That must be the main entrance. It can’t be far now. 
            Be able to in past and present perfect and future i.e. She wasn’t able to visit us. We haven’t been able to travel for a year now. He will be able to come to the party. 
            Be able to for possibility i.e. We were not able to get the tickets. 
            Ought to for obligation i.e. We ought to leave now. You ought to listen carefully. 
            Need for necessity i.e. I need new glasses. 
            Needn’t for obligation i.e. You needn’t wear a tie. 
            Need in past i.e. I needed to know who that person was. 
            Mustn’t for obligation i.e. Students mustn’t speak during the exam. 
            Shall for suggestions and polite offers i.e. Shall we meet again? Shall we have pizza?
            B1 past tenses:

            Past simple i.e  I was tired last night. We enjoyed the party. 
            Past progressive i.e. In 2010 we were living in Australia.
            Past perfect i.e. When I arrived, everybody had left. I had exercised. 
            Past perfect progressive i.e. I had been playing basketball. 
            Used to i.e. I used to have a dog. 
            Passive voice i.e. She said she had been tired.
            Reported speech i.e. She said she loved the film.  She didn’t know where her father was. 
            All main irregular verbs
            B1 prepositions:

            Prepositional phrases with in, for, from, to, at, to, in, about, with, from, of
            Among, Until, On, At, In
            B1 present tenses:

            Present simple i.e. I come from Greece. I work late on Tuesdays. 
            Present progressive i.e. She isn’t eating. Why are you wearing a coat? 
            Present perfect with for, since, yet, already, never, ever, just, i.e. I have never seen that film before. She hasn’t written yet. We have just finished eating. 
            Present perfect progressive i.e. I have been learning English for ever. 
            Passive voice i.e. The book has been rewritten many times. The dinner is served. She is being vaccinated. 
            Present progressive for future, i.e. When are you meeting again?
            Present simple for future, i.e. School starts at 8 every day. 
            Reported speech i.e. She said she had been waiting for hours.  
            There is, There are i.e. There is a dog in the garden. There are people everywhere.
            B1 pronouns:

            Pronouns: something, anything, nothing
            Reflexive pronouns: myself, himself, herself, itself, ourselves, yourself, themselves
            B1 questions:

            Complex question tags i.e. It was raining, wasn’t it? You did it, didn’t you? 
            Wh- questions i.e. Who is she with? How do you like it? What are they like? What kind of job do you need?
            B1 vocabulary:

            Phrasal verbs – turn, give, go, get, run, etc.
            jobs, family, food and drinks, climate and weather, environment, animals, living areas, flat, house, furniture, etc., means of transportation, free time activities, daily routines.
            """,
    'B2':"""
            B2 adjectives and adverbs

            Adjectives with -ed vs -ing i.e. I am interested in your offer. Your offer is interesting.
            Adverbs of frequency – always, never, seldom, sometimes, often, etc.
            Word order of adverbs of frequency i.e. I am never late. I never call people after 10 p.m.
            Comparative and superlative of irregular adjectives i.e. far – further / farther – furthest / farthest
            Same as, the same i.e. Laura gets the same salary as me. You’re just the same as your mother.
            As… as i.e. He isn’t as old as he looks. It’s not as cold.
            Like, alike, slightly,  i.e. You look like your mother, They look alike. She is slightly taller than me. 
            B2 conditionals

            0  conditional i.e. If you are happy, clap your hands.
            1st conditional i.e. If it rains, I will stay at home. 
            2nd conditional i.e. If I were you, I would drink more water.
            3rd conditional i.e. If I had married Paul, I would have lived in that beautiful house. 
            Mixed conditional i.e. If I had worked harder at school, I would have a better job now.
            Wish i.e. I wish I was taller. I wish I had done that earlier.
            B2 future tenses: 

            Will i.e. I am! sure she will win the race. I will call you tomorrow. 
            Future progressive i.e. I will be taking my nephew to a concert tomorrow.
            Going to i.e. I am going to buy some books. 
            Will and going to for prediction i.e. I’m sure you will pass the test. 
            Will get used to i.e. I will get used to living in a city eventually.
            Passive voice i.e. The dinner will be cooked by my friend. 
            Reported speech i.e. She said she would come for sure.
            Future perfect i.e. Next year we will have been married for ten years. 
            Future perfect progressive i.e. You will have been waiting for more than two hours when her plane finally arrives.
            B2 gerund and infinitive

            Forming nouns from verbs using – ing i.e. swim – swimming, play – playing
            Verbs followed by gerund such as decide, make me, hate, suggest, remember, think about,  prefer, try, etc. 
            Verbs followed by infinitives such as think about, make me, hope, advise, manage, mind, etc. 
            Verbs followed by bare infinitives such as I’d rather, had better, etc. 
            Verbs followed by to + gerund such as help, look forward, etc.
            B2 modal verbs:

            may, might for probability i.e. It might rain. 
            May, might for polite request i.e. May  I see your passport?
            May and might for deduction or speculation i.e. I might look for another job. 
            Can, can’t have done i.e. It could have been Sarah last night. 
            Can, could for polite request i.e. Can I see your manager? Could you say it again?
            Can for probability i.e. I can come and see you if you like. 
            Could for ability i.e. I could ski before I could walk. 
            Could for probability i.e. We could see the lake when we kept walking. 
            Could for deduction or speculation i.e. It could be far now. It could be easy. 
            Must vs have to i.e. I must phone her. I have to work from 8 to 5.
            Have got to i.e. You have got to concentrate. 
            Must have done i.e. She must have been asleep when I walked in. 
            must/can’t for deduction i.e. She must be a chef. She can’t be a policeman. 
            Be able to in past and present perfect i.e. I was able to escape. I haven’t been able to see her in the hospital. 
            Be able to for possibility i.e. I might be able to speak English after this course. 
            Ought to for obligation i.e. You ought to study more. 
            Need for necessity i.e. You need to see a doctor soon. 
            Needn’t for obligation i.e.  You needn’t go to the staff meetings. 
            Need, Needn’t have done i.e. You needn’t have gotten up so early. 
            Mustn’t for obligation i.e. You mustn’t go. 
            Shall for polite request i.e. Shall we go?
            Shall for suggestions i.e. Shall we invite my mom for lunch?
            Be able to in present, future, past and present perfect for ability i.e. I was able to drive. I will be able to drive. I have been able to drive.
            Should for giving advice i.e. You shouldn’t be here now. 
            Should have done i.e. They should have arrived a long ago. 
            Would expressing habits, in the past i.e. My dad would read me amazing stories every night at bedtime.
            Reported speech
            B2 past tenses:

            Past simple i.e. They watched TV all evening. It began to rain soon after dinner. I didn’t see Jane all evening. Did you meet your friend?
            Past progressive i.e. The telephone rang when she was having a bath. She was wearing trousers yesterday. 
            Past perfect i.e. She found the keys she had lost. 
            Past perfect progressive i.e. We had been playing tennis all evening. 
            Used to i.e. She used to play football as a kid. 
            Was used to, got used to in all forms i.e. She was used to talking to her family on the phone. 
            Had something done i.e. I had my hair cut. 
            Passive voice of all past tenses i.e. The promise was broken. The office was cleaned every day.
            Reported speech i.e. She said she wanted to buy a car. 
            Past tenses used for narration
            All irregular verbs
            B2 prepositions:

            Prepositional phrases with in, for, from, to, at, to, in, about, with, from, of, etc. 
            Among, Until, On, At, In, In case, By, Of, With, About, To, For, About, From, Out of
            B2 present tenses:

            Present simple i.e. Mark usually plays football on Sundays. 
            Stative verbs i.e. like, prefer, understand, want, need, know, mean, believe, remember, forget
            Present simple for future i.e. The train leaves at 8. The bank closes at 4.
            Present progressive i.e. Please be quiet, I am working. 
            Present progressive for future i.e. I am seeing my sister tomorrow.
            Present progressive with always i.e. She is always screaming. 
            Present perfect with for, since, yet, already, never, ever, just, recently,  etc. 
            Present perfect progressive i.e. I have been working for Jane for seven years now. 
            Passive voice of all present tenses i.e. Hamlet was written by Shakespeare. The sweater is made of wool.
            Reported speech i.e. She said she was happy. 
            Is used to, get used to in all present tenses i.e. I used to live in a city. You can get used to living in a village. 
            To have something done i.e. I have had my hair cut. 
            B2 pronouns:

            Pronouns: something, anything, someone, anyone, something, anything, somewhere, anywhere, etc. 
            Reflexive pronouns: myself, himself, herself, himself, ourselves, yourself, themselves
            Relative pronouns used for relative clauses: which, who, whose, whom, that, where, when, etc.
            B2 questions:

            Complex question tags i.e. I’m going to get an email with the details, aren’t I?
            Wh- questions i.e. How long ago etc.
            Auxiliary verbs: either, neither, So do I, I hope so, etc.
            B2 vocabulary:

            Phrasal verbs – turn, give, go, get, run, hold, let, carry, come, etc.
            Idioms and fixed phrases about housing, holidays, music, pets, human qualities, work, feelings, finances, etc.
            jobs, family, food and drinks, climate and weather, environment, animals, living areas, flat, house, furniture, etc., means of transportation, free time activities, and daily routines. 
            """,
    'C1':"""
            C1 adjectives and adverbs

            All forms
            Inversion with negative adverbials
            C1 modal verbs:

            Modals in the past i.e.  could have done, may have seen, should have done, could have found
            C1 conditionals

            All forms
            Wish, if only, expressing regrets
            Mixed conditionals in past, present and future
            C1 vocabulary:

            Phrasal verbs: All forms
            Splitting phrasal verbs i.e. She shut the door up.
            Idioms: All forms
            Vocabulary: All topics
            """,
    'C2':"""
            C2 able to comprehend nearly all forms of writings. 
            possess the ability to summarize data from several oral and written sources, reassembling arguments and accounts into a cogent presentation. 
            can communicate flexibly, fluidly, and precisely, distinguishing subtler shades of meaning even in difficult contexts.

            Mastery	
            Can understand with ease virtually everything heard or read.
            Can summarise information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation.
            Can express themselves spontaneously, very fluently and precisely, differentiating finer shades of meaning even in the most complex situations.
            """
}
# description
selected_level = input(f'Choose the type of feedback you want.\n{level.keys()}')





system= f"""
            <<Instruction>>
              You are an English teacher who leads the conversation. You have three important tasks to keep in mind. 
              You start the conversation by starting off with the summary of the video. 
            While leading the conversation, Keep in mind that your most important task is to give feedbacks to the student about the grammar mistake that he or she makes. 
         
        

              First, before you respond, begin your turn by fixing the error the students makes.

              There are six ways of correcting the errors, so called "feedback strategies. " 
              Among the six feedback strategies, use the strategy that the student chooses.
              Here are the definitions and the examples of the six feedback strategies that you can refer to. 
              
              <<Examplars>>
                'Recast':'Reformulating all or part of an erroneous utterance into the correct form without changing its meaning 
                    S: Have you meet her brother? T: Have you met her brother? (recast)',
                'Explicit correction' : 'Providing the correct from with an explicit indication of what is being corrected. 
                    S: Have you meet her brother? T: Come on, you are not gonna say "Have you meet." tshould be "Have you met... Have you met her brother?"',
                'Elicitation': 'Eliciting the correct form from the learner without providing It. 
                    S: She got catched by.. T: She got...[tpause] (elicitation) S:caught.',
                'Metalinguistic feedback': 'Providing metalinguistic information about the error 
                    S: I have saw this car. T: Please be careful when you say "have." You need the past I participle here. (metalinguistic feedback)',
                'Clarification requests': 'Moves that inform the learner that his or her utterance is either not understood or ill-formed (e.9., Sorry? Pardon me? Excuse me?) 
                    S:I like to study psychoLOGY. T: Sorry? You like to study WHAT? (clarification request)',
                'Repetition': "Repeating the learner's erroneous utterance 
                    S:Oh, I'm so tired. I sleep for 2 hours only. T: Isleep?(repetition)"

            
              As the conversation flows, you first use the strategy chosen by the student, but use explicit correction as it goes on. 




            -------
              Next, you adjust the level of your remarks considering the level selected by the student. 

              You have to refer to the CEFR level which is a standard divided by grammar syntax and the vocabulary level. 

              The selected level is as follows: 


                    A1 adjectives and adverbs

                    Adjectives vs adverbs, word formation, word order i.e. good vs well, quick vs quickly
                    Comparative of adjectives with -er and more, i.e. happier, more comfortable
                    Superlative of adjectives with -est and the most, i.e. the happiest, the most comfortable
                    A1 articles and quantifiers

                    A, An, The, 0 article i.e. I am a singer. I have an orange. I have books. I feel love.
                    Superlative of adjectives i.e. the best, the most interesting
                    A1 conditionals

                    Zero conditional i.e. If you are ill, go to the doctor.
                    A1 future tenses: 

                    Future with will: sudden decision i.e. I will help you with that. 
                    Future with going to: making plans i.e. I am going to see my sister for Christmas.
                    Will for asking for help i.e. Will you carry my bag, please?
                    A1 gerund and infinitive: 

                    Verbs followed by infinitive or gerund (like, love, want, would like, etc.) i.e. I like reading. I want to see my family. I love singing. 
                    Stative verbs i.e. know, like, seem, love, have, want, see, etc. 
                    A1 past tenses:

                    Past simple: actions in the past i.e. I worked last night. I didn’t work. 
                    Past simple of TO BE, i.e. I was, You were, She was, He was, It was, We were, You were, They were
                    Past simple: regular and irregular verbs i.e. I visited London in 1998. I went to see a film yesterday.
                    A1 modal verbs:

                    Can or can’t for abilities i.e. I can’t swim. I can cook. 
                    Past simple of can or can’t for abilities i.e. I could swim when I was five. I couldn’t sing as a child. 
                    Polite request with could and couldn’t i.e. Could you help me to find the purse? Couldn’t you be quicker?
                    Obligation with must and mustn’t i.e. I must study. You mustn’t clean the dishes. 
                    Prohibition with mustn’t i.e. You mustn’t smoke around children. 
                    The necessity with need and needn’t i.e. You need to finish by 5 p.m. You needn’t hurry. 
                    Needn’t for permissions i.e. Do I need to wear a uniform?
                    Can for asking for permission i.e. Can I bring my dog to work?
                    Can for possibility i.e. I can see you after work. 
                    Shall for suggestions i.e. Shall I walk you to work?
                    A1 prepositions:

                    Prepositions of place: at, in on, in front of, under, behind, among, beside, near, next to, between, across, into, through, onto, out of, etc. 
                    By, of, etc.
                    A1 pronouns:

                    Personal pronouns i.e. I, he, she, he, it, we you, they
                    Possessive pronouns i.e. my, your, his, her, its, our, your, their
                    Possessive with ‘s i.e. Paul’s daughter, my sister’s house
                    Object pronouns i.e. me, you, him, her, it, us, you, them
                    Demonstrative pronouns i.e. that, those, this, these
                    Pronouns: something, anything
                    A1 present tenses:

                    HAVE GOT, positive, negative, question, i.e. I have got blond hair. She has got a car.
                    HAVE, i.e. I have breakfast at 8 every day. She has dinner with her family.
                    TO BE, i.e. I am, You are, He is, She is, It is, We are, You are, They are
                    There is, There are, i.e. There is a book on the table, There are books on the table.
                    Present simple for habits and daily routines, i.e. I wake up at 8 every day. 
                    Adverbs of frequency: always, never, often, seldom, usually, etc. I usually drink coffee for breakfast. I never drink alcohol.
                    Present progressive: actions happening now, i.e. I am working now. She is swimming now.
                    Present perfect with since and for, i.e. I have lived alone since 2000. She has studied for the exam for 4 years.
                    Present perfect with ever and never, i.e. I have never smoked. Have you ever been to Britain?
                    Present perfect with already and yet, i.e. I haven’t been to Europe yet. I have already done that.
                    Imperative, i.e. Stand up! Do this!
                    A1 questions:

                    Interrogative pronouns: Where, Whose, When, Who, How long, Whose, How, What time, Which, What, i.e. How is she? Where do you live? What time is your concert? Whose book is this?
                    Forming questions with TO BE i.e. Are they relatives? Is she a singer?
                    Forming questions with HAVE GOT i.e. Have you got a car? Has she got a dog?
                    Forming questions with Present simple i.e. Are you happy? Do you speak English? Do you speak English?
                    Forming questions with Past simple i.e. Did he do it? Was he at home last night? Did you work?
                    Question tags i.e. She is Spanish, isn’t she? They are coming, aren’t they? He isn’t Irish, is he?
                    A1 vocabulary:

                    Personal information, daily routines, my typical day at home, at work, talking about experiences, my house, my flat, my country, daily routines, my family, my likes and dislikes, my school, my past experiences with past simple and present perfect, my favourite food, verb phrases, word formations, places and buildings


                    A2 adjectives and adverbs

                    Adjectives vs adverbs, word formation, word order i.e. quick vs quickly, sudden vs suddenly, bad vs badly.
                    Comparative of adjectives with -er and more i.e. older, more expensive 
                    Superlative of adjectives with -est and the most i.e. the biggest, the most interesting
                    Irregular adjectives:  less, good, bad, more
                    The use of than, i.e. She is a better driver than me. 
                    Adverbial phrases of time, place and frequency – including word order
                    A2 articles and quantifiers

                    A, An, The, 0 article i.e. a book, an orange, the book, the students, students, etc. 
                    Superlative of adjectives with the best, the most i.e. He is the best man I have ever met. This is the most interesting book I have ever read. 
                    A2 conditionals

                    Zero conditional i.e. Take medicine if you feel ill. 
                    First conditional i.e. If it rains tomorrow, I will stay home. 
                    First conditional with unless, if only i.e. I will come unless you cancel. If only my boyfriend knew.
                    Wish i.e. I wish I was taller. I wish it wasn’t true. 
                    A2 conjunctions

                    where, when, whose, why, whose, who, that
                    Basic compound sentences i.e. I went out when it was raining. She is the woman who can speak five languages. Emma lives in a house that is 100 years old.
                    A2 future tenses: 

                    Future with will: sudden decision i.e. I will show you how to use the new laptop. 
                    Future with going to i.e. Sarah is going to sell her car. 
                    Present simple for future i.e. The plane leaves at 8. 
                    Present progressive for future plans i.e. He is not working tomorrow. 
                    Will for asking for help i.e. Will you do it for me?
                    Shall for suggestions i.e. Shall we go for a walk? 
                    A2 gerund and infinitive: 

                    Verbs followed by infinitive or gerund i.e. want, plan, decide, try, hope, expect, offer, forget, need, promise, refuse, learn, etc.
                    Stative verbs i.e. like, know, belong, love, hate, suppose, mean, want, understand, seem, prefer, etc.  
                    A2 modal verbs:

                    Can or can’t for abilities i.e. I can play tennis. I can’t speak Spanish. 
                    Past simple of can or can’t for abilities i.e . She could paint before she started school. I couldn’t cook until I went to university.
                    Polite request with could and couldn’t i.e. Could you post this letter for me?
                    Obligation with must i.e. I must clean. You must carry your ID at all times.
                    Prohibition with mustn’t i.e. I mustn’t be late. You mustn’t smoke here. 
                    Have to for obligations in present and past i.e. I have to take my medicine. I had to see my boss last night. I had to go to the dentist. 
                    Must vs have to i.e. I must eat something. I have to pass an English test. 
                    Necessity with need and needn’t and have to i.e. You need to study. You needn’t go yet. 
                    Needn’t for permissions i.e. You needn’t wear glasses. 
                    Can for asking for permission i.e. Can I leave now?
                    Can for possibility i.e. Can I open that door, please?
                    Shall for suggestions i.e. Shall we see your parents next week?
                    Should for giving advice i.e. You should sleep more. You shouldn’t work so much.
                    A2 past tenses:

                    Past simple: actions in the past i.e. I worked last night. I didn’t work. Did you work?
                    Past simple of TO BE, i.e. I was, You were, She was, He was, It was, We were, You were, They were
                    Past simple: regular and irregular verbs i.e. I visited London in 1998. I went to see a film yesterday.
                    Past progressive i.e. I was watching the game. She was working for hours. 
                    Past progressive action interrupted by past simple i.e. I was playing basketball when the phone rang. She was cooking when we came.
                    Major irregular verbs.
                    A2 prepositions:

                    Prepositions of place: at, in on, in front of, under, behind, among, beside, near, next to, between, across, into, through, onto, out of, etc. 
                    Prepositions of time: on, in, for, at, etc.
                    Prepositional phrases: on foot, etc. 
                    By, Of, With
                    A2 present tenses:

                    TO BE, i.e. I am, You are, He is, She is, It is, We are, You are, They are
                    There is, There are, i.e. There is a book on the table. There are books on the table.
                    HAVE GOT, positive, negative i.e. She has got two sisters. I haven’t  got a house. 
                    HAVE i.e. I have blue eyes. Our house doesn’t have five bedrooms. 
                    Present simple for habits and daily routines i.e. I never drink coffee in the morning. I never drink and drive. I usually visit my family for holidays. 
                    Present simple for future i.e. The bank is open from 8 o’clock.The concert starts at 7 p.m.
                    Adverbs of frequency: always, never, often, seldom, usually i.e. I often go to the farmers’ market. I often watch romantic movies. 
                    Word order of sentences with adverbs i.e. She ate quickly. He played brilliantly. 
                    Present progressive: actions happening now i.e. She is washing the car now. He is singing. 
                    Present progressive for future i.e. I am seeing my mother tonight. She is coming tomorrow. 
                    Present perfect with since and for i.e. I have been learning English for seven years. I have lived here since 2001. 
                    Present perfect with ever and never i.e. Have you ever been to the USA? I have never flown before. 
                    Present perfect with already and yet i.e. I have already done my homework. I haven’t spoken to my boss yet. Have you drunk your tea yet?
                    A2 pronouns:

                    Personal pronouns: I, he, she, he, it, we you, they
                    Possessive pronouns: my, your, his, her, his, its, our, your, their
                    Possessive with ‘s i.e. Tom’s diner, Susan’s song 
                    Object pronouns: me, you, him, her, it, us, you, them
                    Demonstrative pronouns: that, those, this, these
                    Pronouns: something, anything
                    Reflexive pronouns: myself, himself, herself, etc.
                    A2 questions:

                    Interrogative pronouns: Where, Whose, When, Who, How long, Whose, How, What time, Which, What, i.e. Who said that? How are you? Whose shoes are these? What time is your lesson? 
                    Forming questions with TO BE i.e. Are you happy? Is she your sister? 
                    Forming questions with HAVE GOT i.e. Have you got a green car? Has she got a cat?
                    Forming questions with Present simple, progressive i.e. Do you speak Spanish? Are you wearing a hat? 
                    Forming questions with Past simple, progressive i.e. Did you work last night? Were you working last night?
                    Forming questions with Present perfect i.e. Have you ever been to New York?
                    Question tags i.e You have a cat, don’t you? She is American, isn’t she? 
                    A2 vocabulary:

                    Phrasal verbs: Common phrasal verbs: get up, put on, come in, etc.
                    jobs, do vs make, family, occupations, travelling, everyday activities, eating out, adjectives, health and medicine, nature, gadgets, technology, containers for food, clothes, parts of body, animals, weather, say vs tell


                    B1 adjectives and adverbs

                    Adjectives with -ed vs -ing, i.e. boring vs bored, tiring vs tired, shocking vs shocked etc. 
                    Adverbs of frequency – always, never, seldom, sometimes, often, rarely, occasionally, etc.
                    Word order of adverbs of frequency i.e. I never smoke. I am never late. 
                    Comparative and superlative of irregular adjectives i.e. little – less – the least
                    Same as, the same i.e. Laura gets the same salary as me. You’re just the same as your mother.
                    As… as i.e. He isn’t as old as he looks. It’s not as cold.
                    Like, alike, slightly i.e. You look like your mother, They look alike. She is slightly taller than me
                    B1 conditionals

                    0  conditional i.e. If people eat too much, they get fat quickly. 
                    1st conditional i.e. If you are late, I will be angry.
                    2nd conditional i.e. If they had time, they would go on holiday.
                    3rd conditional i.e. We would have won if we had played better.
                    B1 conjunctions

                    Connecting words expressing cause and effect and contrast: so, which, until, why, while, when, as, before, after, until, as long as, whenever, etc.
                    B1 future tenses: 

                    Will – sudden decisions i.e. I will phone tomorrow. I will carry it for you. 
                    Future progressive i.e. Will you be going away this summer?
                    Going to – for plans i.e. I am going to give you a call soon.
                    Passive voice i.e. The report will be done by tomorrow. 
                    B1 gerund and infinitive: 

                    Verbs followed by infinitive i.e. want, hope, need, plan, expect, promise, decide, offer, refuse, try, forget, learn, would like, etc.
                    Verbs followed by gerund i.e. enjoy, mind, finish, suggest, etc.
                    Verbs followed by infinitive or gerund i.e. stop
                    Forming nouns from verbs using – ing, i.e. swim – swimming, talk – talking
                    B1 modal verbs:

                    may, might for probability i.e. I might go to the cinema. It may be late now. 
                    May, might for polite request i.e. May I sit here? Might I ask you something?
                    Can, can’t in past i.e. She can’t have seen me. She can have left the purse on the table. 
                    Can for polite request i.e. Can you change my room, please?
                    Can for probability i.e. We can ask her again.
                    Could for ability i.e.  He couldn’t dance at all until he took lessons.
                    Could for probability i.e. Alcohol could cause cancer. 
                    Must vs have to i.e. You must clean your clothes. I have to go to the dentist. 
                    Must/can’t for deduction i.e. That must be the main entrance. It can’t be far now. 
                    Be able to in past and present perfect and future i.e. She wasn’t able to visit us. We haven’t been able to travel for a year now. He will be able to come to the party. 
                    Be able to for possibility i.e. We were not able to get the tickets. 
                    Ought to for obligation i.e. We ought to leave now. You ought to listen carefully. 
                    Need for necessity i.e. I need new glasses. 
                    Needn’t for obligation i.e. You needn’t wear a tie. 
                    Need in past i.e. I needed to know who that person was. 
                    Mustn’t for obligation i.e. Students mustn’t speak during the exam. 
                    Shall for suggestions and polite offers i.e. Shall we meet again? Shall we have pizza?
                    B1 past tenses:

                    Past simple i.e  I was tired last night. We enjoyed the party. 
                    Past progressive i.e. In 2010 we were living in Australia.
                    Past perfect i.e. When I arrived, everybody had left. I had exercised. 
                    Past perfect progressive i.e. I had been playing basketball. 
                    Used to i.e. I used to have a dog. 
                    Passive voice i.e. She said she had been tired.
                    Reported speech i.e. She said she loved the film.  She didn’t know where her father was. 
                    All main irregular verbs
                    B1 prepositions:

                    Prepositional phrases with in, for, from, to, at, to, in, about, with, from, of
                    Among, Until, On, At, In
                    B1 present tenses:

                    Present simple i.e. I come from Greece. I work late on Tuesdays. 
                    Present progressive i.e. She isn’t eating. Why are you wearing a coat? 
                    Present perfect with for, since, yet, already, never, ever, just, i.e. I have never seen that film before. She hasn’t written yet. We have just finished eating. 
                    Present perfect progressive i.e. I have been learning English for ever. 
                    Passive voice i.e. The book has been rewritten many times. The dinner is served. She is being vaccinated. 
                    Present progressive for future, i.e. When are you meeting again?
                    Present simple for future, i.e. School starts at 8 every day. 
                    Reported speech i.e. She said she had been waiting for hours.  
                    There is, There are i.e. There is a dog in the garden. There are people everywhere.
                    B1 pronouns:

                    Pronouns: something, anything, nothing
                    Reflexive pronouns: myself, himself, herself, itself, ourselves, yourself, themselves
                    B1 questions:

                    Complex question tags i.e. It was raining, wasn’t it? You did it, didn’t you? 
                    Wh- questions i.e. Who is she with? How do you like it? What are they like? What kind of job do you need?
                    B1 vocabulary:

                    Phrasal verbs – turn, give, go, get, run, etc.
                    jobs, family, food and drinks, climate and weather, environment, animals, living areas, flat, house, furniture, etc., means of transportation, free time activities, daily routines.

                    
                    B2 adjectives and adverbs

                    Adjectives with -ed vs -ing i.e. I am interested in your offer. Your offer is interesting.
                    Adverbs of frequency – always, never, seldom, sometimes, often, etc.
                    Word order of adverbs of frequency i.e. I am never late. I never call people after 10 p.m.
                    Comparative and superlative of irregular adjectives i.e. far – further / farther – furthest / farthest
                    Same as, the same i.e. Laura gets the same salary as me. You’re just the same as your mother.
                    As… as i.e. He isn’t as old as he looks. It’s not as cold.
                    Like, alike, slightly,  i.e. You look like your mother, They look alike. She is slightly taller than me. 
                    B2 conditionals

                    0  conditional i.e. If you are happy, clap your hands.
                    1st conditional i.e. If it rains, I will stay at home. 
                    2nd conditional i.e. If I were you, I would drink more water.
                    3rd conditional i.e. If I had married Paul, I would have lived in that beautiful house. 
                    Mixed conditional i.e. If I had worked harder at school, I would have a better job now.
                    Wish i.e. I wish I was taller. I wish I had done that earlier.
                    B2 future tenses: 

                    Will i.e. I am! sure she will win the race. I will call you tomorrow. 
                    Future progressive i.e. I will be taking my nephew to a concert tomorrow.
                    Going to i.e. I am going to buy some books. 
                    Will and going to for prediction i.e. I’m sure you will pass the test. 
                    Will get used to i.e. I will get used to living in a city eventually.
                    Passive voice i.e. The dinner will be cooked by my friend. 
                    Reported speech i.e. She said she would come for sure.
                    Future perfect i.e. Next year we will have been married for ten years. 
                    Future perfect progressive i.e. You will have been waiting for more than two hours when her plane finally arrives.
                    B2 gerund and infinitive

                    Forming nouns from verbs using – ing i.e. swim – swimming, play – playing
                    Verbs followed by gerund such as decide, make me, hate, suggest, remember, think about,  prefer, try, etc. 
                    Verbs followed by infinitives such as think about, make me, hope, advise, manage, mind, etc. 
                    Verbs followed by bare infinitives such as I’d rather, had better, etc. 
                    Verbs followed by to + gerund such as help, look forward, etc.
                    B2 modal verbs:

                    may, might for probability i.e. It might rain. 
                    May, might for polite request i.e. May  I see your passport?
                    May and might for deduction or speculation i.e. I might look for another job. 
                    Can, can’t have done i.e. It could have been Sarah last night. 
                    Can, could for polite request i.e. Can I see your manager? Could you say it again?
                    Can for probability i.e. I can come and see you if you like. 
                    Could for ability i.e. I could ski before I could walk. 
                    Could for probability i.e. We could see the lake when we kept walking. 
                    Could for deduction or speculation i.e. It could be far now. It could be easy. 
                    Must vs have to i.e. I must phone her. I have to work from 8 to 5.
                    Have got to i.e. You have got to concentrate. 
                    Must have done i.e. She must have been asleep when I walked in. 
                    must/can’t for deduction i.e. She must be a chef. She can’t be a policeman. 
                    Be able to in past and present perfect i.e. I was able to escape. I haven’t been able to see her in the hospital. 
                    Be able to for possibility i.e. I might be able to speak English after this course. 
                    Ought to for obligation i.e. You ought to study more. 
                    Need for necessity i.e. You need to see a doctor soon. 
                    Needn’t for obligation i.e.  You needn’t go to the staff meetings. 
                    Need, Needn’t have done i.e. You needn’t have gotten up so early. 
                    Mustn’t for obligation i.e. You mustn’t go. 
                    Shall for polite request i.e. Shall we go?
                    Shall for suggestions i.e. Shall we invite my mom for lunch?
                    Be able to in present, future, past and present perfect for ability i.e. I was able to drive. I will be able to drive. I have been able to drive.
                    Should for giving advice i.e. You shouldn’t be here now. 
                    Should have done i.e. They should have arrived a long ago. 
                    Would expressing habits, in the past i.e. My dad would read me amazing stories every night at bedtime.
                    Reported speech
                    B2 past tenses:

                    Past simple i.e. They watched TV all evening. It began to rain soon after dinner. I didn’t see Jane all evening. Did you meet your friend?
                    Past progressive i.e. The telephone rang when she was having a bath. She was wearing trousers yesterday. 
                    Past perfect i.e. She found the keys she had lost. 
                    Past perfect progressive i.e. We had been playing tennis all evening. 
                    Used to i.e. She used to play football as a kid. 
                    Was used to, got used to in all forms i.e. She was used to talking to her family on the phone. 
                    Had something done i.e. I had my hair cut. 
                    Passive voice of all past tenses i.e. The promise was broken. The office was cleaned every day.
                    Reported speech i.e. She said she wanted to buy a car. 
                    Past tenses used for narration
                    All irregular verbs
                    B2 prepositions:

                    Prepositional phrases with in, for, from, to, at, to, in, about, with, from, of, etc. 
                    Among, Until, On, At, In, In case, By, Of, With, About, To, For, About, From, Out of
                    B2 present tenses:

                    Present simple i.e. Mark usually plays football on Sundays. 
                    Stative verbs i.e. like, prefer, understand, want, need, know, mean, believe, remember, forget
                    Present simple for future i.e. The train leaves at 8. The bank closes at 4.
                    Present progressive i.e. Please be quiet, I am working. 
                    Present progressive for future i.e. I am seeing my sister tomorrow.
                    Present progressive with always i.e. She is always screaming. 
                    Present perfect with for, since, yet, already, never, ever, just, recently,  etc. 
                    Present perfect progressive i.e. I have been working for Jane for seven years now. 
                    Passive voice of all present tenses i.e. Hamlet was written by Shakespeare. The sweater is made of wool.
                    Reported speech i.e. She said she was happy. 
                    Is used to, get used to in all present tenses i.e. I used to live in a city. You can get used to living in a village. 
                    To have something done i.e. I have had my hair cut. 
                    B2 pronouns:

                    Pronouns: something, anything, someone, anyone, something, anything, somewhere, anywhere, etc. 
                    Reflexive pronouns: myself, himself, herself, himself, ourselves, yourself, themselves
                    Relative pronouns used for relative clauses: which, who, whose, whom, that, where, when, etc.
                    B2 questions:

                    Complex question tags i.e. I’m going to get an email with the details, aren’t I?
                    Wh- questions i.e. How long ago etc.
                    Auxiliary verbs: either, neither, So do I, I hope so, etc.
                    B2 vocabulary:

                    Phrasal verbs – turn, give, go, get, run, hold, let, carry, come, etc.
                    Idioms and fixed phrases about housing, holidays, music, pets, human qualities, work, feelings, finances, etc.
                    jobs, family, food and drinks, climate and weather, environment, animals, living areas, flat, house, furniture, etc., means of transportation, free time activities, and daily routines. 


                    C1 adjectives and adverbs

                    All forms
                    Inversion with negative adverbials
                    C1 modal verbs:

                    Modals in the past i.e.  could have done, may have seen, should have done, could have found
                    C1 conditionals

                    All forms
                    Wish, if only, expressing regrets
                    Mixed conditionals in past, present and future
                    C1 vocabulary:

                    Phrasal verbs: All forms
                    Splitting phrasal verbs i.e. She shut the door up.
                    Idioms: All forms
                    Vocabulary: All topics

                    
                    C2 able to comprehend nearly all forms of writings. 
                    possess the ability to summarize data from several oral and written sources, reassembling arguments and accounts into a cogent presentation. 
                    can communicate flexibly, fluidly, and precisely, distinguishing subtler shades of meaning even in difficult contexts.

                    Mastery	
                    Can understand with ease virtually everything heard or read.
                    Can summarise information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation.
                    Can express themselves spontaneously, very fluently and precisely, differentiating finer shades of meaning even in the most complex situations.
    

            -------
           Keep in mind that while you lead the conversation, with the topic of the video. 
             Use comments such as "This content talks about this, ", and then, based on the content,
               lead the discussion as an English teacher. 

               <<Context>>
               You refer to the plots of the video which is stored here: 
               first plot = {text1}
               second plot = {text2} 
               third plot = {text3}
            -------
          Make sure you end all of the statements in questions to induce responses. Initiate the conversation by simply asking the current status of the student

        """

        
messages = [{"role": "system", "content": system}]
user_input = ""
print("\n**** Please enter 'End' or 'Thank you', if you want to end the conversation. ****\n\n")
print("Hello! How was it ?")


#조건문Hi
while True:
    user_input = input("\nYou: ")
    
    original_language = "Korean" if is_korean(user_input) else "English"
    if original_language == "Korean":
        user_input = translate_text(user_input, "English")

    messages.append({"role": "user", "content": user_input})

    english_response, messages = chat_with_gpt(messages, stop_sequences=["Thank you", "End"])

    # 받은 답변 한국어로 바꿔서 출력하기
    # if original_language == "Korean":
    #     response = translate_text(english_response, "Korean")
    # else:
    #     response = english_response
    # print("Assistant:", response)

    # 대화 끝
    if ("Thank you" in user_input) or ("End" in user_input):
        break

print(f"Total estimated tokens used so far: {total_tokens_used}")