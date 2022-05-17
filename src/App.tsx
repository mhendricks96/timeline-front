import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Settings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { pages } from './pages';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <IonTabs>
        <IonRouterOutlet>
          {pages.map((page, index) => {
            return <Route key={index} path={page.path} component={page.component} />
          })}

          <Route exact path="/">
            <Redirect to={pages.filter(page => page.redirect)[0].path} />
          </Route>

        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          {pages.map((page, index) => {

            const {label, path, icon, isTab} = page;

            if (isTab) {

              return (
                // tab= could also be label
                <IonTabButton key={index} tab={label} href={path}>
                  <IonIcon icon={icon} />
                  <IonLabel>{label}</IonLabel>
                </IonTabButton>
              )
            } else return null;
          })}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
