{
/*
<Route path="/" component={MainComponent}>
  <IndexRoute component={IndexComponent} />
  <Route path="list" component={ListComponent} />
  <Route path="login" component={LoginComponent} />
</Route>
<Route path="*" component={NoMatchComponent} />
*/
}

import {auth, logout, login, saveUser} from './auth';

import IndexComponent from '../components/IndexComponent';
import MainComponent from '../components/MainComponent';
import ListComponent from '../components/ListComponent';
import LoginComponent from '../components/LoginComponent';
import NoMatchComponent from '../components/NoMatchComponent';

function redirectToHome(nextState, replace) {
	replace('/');
}


const routes = {
	component: MainComponent,
	childRoutes: [
		{	path: '/',
			indexRoute: {
				getComponent: (nextState, cb)=>{
						require.ensure([], (require)=>{
							cb(null, IndexComponent);
						});
				}
			},
			childRoutes: [
				{
					path: 'list', 
					getComponent: (nextState, cb)=>{
							require.ensure([], (require)=>{
								cb(null, ListComponent);
							});
					}
				},
				{
					path: 'login', 
					getComponent: (nextState, cb)=>{
							require.ensure([], (require)=>{
								cb(null, LoginComponent);
							});
					}
				}
			]
		},
		{	path: '*',
			getComponent: (nextState, cb)=>{
					require.ensure([], (require)=>{
						cb(null, NoMatchComponent);
					});
				setTimeout(()=>{
						redirectToHome();
					},
					1000
				)
			}
		}
	]
}

export default routes;