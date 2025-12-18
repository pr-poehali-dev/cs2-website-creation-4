import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  avatar: string;
  category: string;
  likes: number;
  comments: number;
  views: number;
  time: string;
  isPinned?: boolean;
}

interface User {
  name: string;
  role: 'admin' | 'moderator' | 'user';
  avatar: string;
  posts: number;
  likes: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentUser] = useState<User>({
    name: 'Александр',
    role: 'admin',
    avatar: '',
    posts: 42,
    likes: 328
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'Добро пожаловать в наше сообщество!',
      content: 'Рады видеть вас здесь. Делитесь идеями, общайтесь и развивайтесь вместе с нами.',
      author: 'Мария Иванова',
      avatar: '',
      category: 'Объявления',
      likes: 45,
      comments: 12,
      views: 234,
      time: '2 часа назад',
      isPinned: true
    },
    {
      id: 2,
      title: 'Как начать свой проект: советы для новичков',
      content: 'Собрал список полезных ресурсов и инструментов для тех, кто только начинает.',
      author: 'Дмитрий Петров',
      avatar: '',
      category: 'Обучение',
      likes: 67,
      comments: 23,
      views: 456,
      time: '5 часов назад'
    },
    {
      id: 3,
      title: 'Обсуждение новых трендов в дизайне 2024',
      content: 'Что вы думаете о минимализме и ярких акцентах? Давайте обсудим!',
      author: 'Анна Смирнова',
      avatar: '',
      category: 'Дизайн',
      likes: 89,
      comments: 34,
      views: 567,
      time: '1 день назад'
    }
  ]);

  const categories = ['Все', 'Объявления', 'Обучение', 'Дизайн', 'Разработка', 'Общее'];

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleDeletePost = (postId: number) => {
    if (currentUser.role === 'admin' || currentUser.role === 'moderator') {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="glass-effect border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Icon name="MessageCircle" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ForumHub
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-2">
              {[
                { id: 'home', label: 'Главная', icon: 'Home' },
                { id: 'discussions', label: 'Обсуждения', icon: 'MessageSquare' },
                { id: 'profile', label: 'Профиль', icon: 'User' },
                { id: 'payment', label: 'Оплата', icon: 'CreditCard' },
                { id: 'contacts', label: 'Контакты', icon: 'Mail' }
              ].map(item => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(item.id)}
                  className="gap-2 transition-all hover:scale-105"
                >
                  <Icon name={item.icon as any} size={18} />
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-primary cursor-pointer hover:scale-110 transition-transform">
                <AvatarFallback className="gradient-primary text-white font-semibold">
                  {currentUser.name[0]}
                </AvatarFallback>
              </Avatar>
              {currentUser.role === 'admin' && (
                <Badge className="gradient-primary border-0">Admin</Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 glass-effect border-2 animate-fade-in">
                <div className="flex items-start gap-4">
                  <Avatar className="border-2 border-primary">
                    <AvatarFallback className="gradient-primary text-white">
                      {currentUser.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-start text-muted-foreground hover:border-primary transition-all">
                        <Icon name="Plus" size={18} className="mr-2" />
                        Создать новый пост...
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Новый пост</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <Input placeholder="Заголовок поста" className="text-lg" />
                        <Textarea placeholder="Расскажите что-то интересное..." className="min-h-[200px]" />
                        <div className="flex gap-3">
                          <Button className="gradient-primary border-0 flex-1">
                            <Icon name="Send" size={18} className="mr-2" />
                            Опубликовать
                          </Button>
                          <Button variant="outline">Отмена</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map(cat => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-white transition-all whitespace-nowrap"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <div className="space-y-4">
                {posts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary animate-slide-up glass-effect"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {post.isPinned && (
                      <Badge className="mb-3 gradient-primary border-0">
                        <Icon name="Pin" size={14} className="mr-1" />
                        Закреплено
                      </Badge>
                    )}
                    
                    <div className="flex items-start gap-4">
                      <Avatar className="border-2 border-primary">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                          {post.author[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold mb-1 hover:text-primary transition-colors cursor-pointer">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {post.author} · {post.time}
                            </p>
                          </div>
                          {(currentUser.role === 'admin' || currentUser.role === 'moderator') && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          )}
                        </div>
                        
                        <p className="text-foreground/80">{post.content}</p>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="gradient-card border-0">
                            {post.category}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className="gap-2 hover:text-primary transition-all hover:scale-110"
                          >
                            <Icon name="Heart" size={18} />
                            <span className="font-semibold">{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 hover:text-primary transition-all hover:scale-110">
                            <Icon name="MessageCircle" size={18} />
                            <span className="font-semibold">{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 hover:text-primary transition-all hover:scale-110">
                            <Icon name="Eye" size={18} />
                            <span className="font-semibold">{post.views}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="ml-auto hover:text-primary transition-all hover:scale-110">
                            <Icon name="Share2" size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 glass-effect border-2 animate-fade-in">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} className="text-primary" />
                  Популярные темы
                </h3>
                <div className="space-y-3">
                  {['Веб-разработка', 'UI/UX дизайн', 'Мобильные приложения', 'Искусственный интеллект'].map(topic => (
                    <div
                      key={topic}
                      className="p-3 rounded-lg hover:bg-primary/10 transition-all cursor-pointer gradient-card border border-primary/20"
                    >
                      <p className="font-medium">{topic}</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 50 + 10)} обсуждений
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 glass-effect border-2 animate-fade-in">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Icon name="Users" size={20} className="text-secondary" />
                  Активные участники
                </h3>
                <div className="space-y-3">
                  {['Елена К.', 'Игорь М.', 'Ольга Р.', 'Сергей В.'].map(name => (
                    <div key={name} className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
                      <Avatar className="border-2 border-secondary">
                        <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                          {name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100 + 20)} постов</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-8 glass-effect border-2 animate-fade-in">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary">
                  <AvatarFallback className="gradient-primary text-white text-3xl font-bold">
                    {currentUser.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold">{currentUser.name}</h2>
                    <Badge className="gradient-primary border-0">
                      {currentUser.role === 'admin' ? 'Администратор' : currentUser.role === 'moderator' ? 'Модератор' : 'Участник'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">Активный участник сообщества</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-2xl font-bold text-primary">{currentUser.posts}</p>
                      <p className="text-sm text-muted-foreground">Постов</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-secondary">{currentUser.likes}</p>
                      <p className="text-sm text-muted-foreground">Лайков</p>
                    </div>
                  </div>
                </div>
                <Button className="gradient-primary border-0">
                  <Icon name="Settings" size={18} className="mr-2" />
                  Настройки
                </Button>
              </div>
            </Card>

            {currentUser.role === 'admin' && (
              <Card className="p-8 glass-effect border-2 border-primary/50 animate-fade-in">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="Shield" size={24} className="text-primary" />
                  Панель модерации
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 justify-start hover:border-primary transition-all">
                    <Icon name="Users" size={20} className="mr-3 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">Управление пользователями</p>
                      <p className="text-sm text-muted-foreground">Роли и права доступа</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 justify-start hover:border-secondary transition-all">
                    <Icon name="FileText" size={20} className="mr-3 text-secondary" />
                    <div className="text-left">
                      <p className="font-semibold">Модерация контента</p>
                      <p className="text-sm text-muted-foreground">Проверка и удаление постов</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 justify-start hover:border-accent transition-all">
                    <Icon name="BarChart3" size={20} className="mr-3 text-accent" />
                    <div className="text-left">
                      <p className="font-semibold">Статистика</p>
                      <p className="text-sm text-muted-foreground">Активность и аналитика</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 justify-start hover:border-destructive transition-all">
                    <Icon name="AlertTriangle" size={20} className="mr-3 text-destructive" />
                    <div className="text-left">
                      <p className="font-semibold">Жалобы</p>
                      <p className="text-sm text-muted-foreground">Обработка сообщений</p>
                    </div>
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 glass-effect border-2 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-center">Премиум подписка</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 hover:scale-105 transition-all cursor-pointer border-2 hover:border-primary">
                  <h3 className="text-xl font-bold mb-2">Базовый</h3>
                  <p className="text-3xl font-bold text-primary mb-4">Бесплатно</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      Создание постов
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} className="text-primary" />
                      Комментарии
                    </li>
                  </ul>
                </Card>
                <Card className="p-6 gradient-primary text-white hover:scale-105 transition-all cursor-pointer border-0">
                  <h3 className="text-xl font-bold mb-2">Премиум</h3>
                  <p className="text-3xl font-bold mb-4">990₽/мес</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} />
                      Без рекламы
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} />
                      Особый значок
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={18} />
                      Приоритет в поддержке
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-white text-primary hover:bg-white/90">
                    Оформить
                  </Button>
                </Card>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 glass-effect border-2 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-center">Свяжитесь с нами</h2>
              <div className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input type="email" placeholder="Email" />
                <Textarea placeholder="Ваше сообщение" className="min-h-[150px]" />
                <Button className="w-full gradient-primary border-0">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 rounded-lg gradient-card">
                  <Icon name="Mail" size={24} className="mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">support@forum.com</p>
                </div>
                <div className="text-center p-4 rounded-lg gradient-card">
                  <Icon name="Phone" size={24} className="mx-auto mb-2 text-secondary" />
                  <p className="font-semibold">Телефон</p>
                  <p className="text-sm text-muted-foreground">+7 (999) 123-45-67</p>
                </div>
                <div className="text-center p-4 rounded-lg gradient-card">
                  <Icon name="MapPin" size={24} className="mx-auto mb-2 text-accent" />
                  <p className="font-semibold">Адрес</p>
                  <p className="text-sm text-muted-foreground">Москва, Россия</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="glass-effect border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground">© 2024 ForumHub. Все права защищены.</p>
            <div className="flex gap-4">
              {['Twitter', 'Facebook', 'Instagram', 'Github'].map(social => (
                <Button key={social} variant="ghost" size="sm" className="hover:text-primary hover:scale-110 transition-all">
                  {social}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
