export enum PATH {
		notFound = '*',
		main = '/',
		login = '/login',
		register = '/register',
		forgotPass = '/forgotPass',
		setNewPass = '/set-new-password/:token',
		profile = '/profile',
		pack = '/pack/',
		cards = '/pack/:packId',
		learn = '/pack/learn/',
		learnPage = '/pack/learn/:id',
}