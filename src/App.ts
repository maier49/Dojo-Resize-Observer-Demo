import WidgetBase from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import Calendar from './widgets/Calendar';
import Card from './widgets/Card';
import Article from './widgets/Article';
import Columns from './widgets/Columns';
import Button from '@dojo/widgets/Button';
import * as css from './styles/app.m.css';
import Resize, { ContentRect } from '@dojo/widget-core/meta/Resize';

export class App extends WidgetBase {

	private _offset = 0;

	private _rotate() {
		this._offset = (this._offset + 1) % 4;
		this.invalidate();
	}

  protected _smallPredicate(contentRect: ContentRect) {
    return contentRect.width < 600;
  }

	protected render() {
    const { isSmall } = this.meta(Resize).get('root', {
      isSmall: this._smallPredicate
    });
	  const widgets = [
      w(Article, {}),
      v('div', {}, [
        v('h3', {}, [ 'Cards in a Grid Container' ]),
        w(Columns, {}, [ w(Card, { labelOnLeft: true }), w(Card, { labelOnLeft: true }) ])
      ]),
      w(Calendar, {}),
      w(Card, {})
    ];

	  return v('div', { classes: css.root }, [
      v('div', { key: 'controls', styles: { height: '25px' }}, [
        w(Button, { onClick: () => this._rotate() }, [
          'Switch Demo Positions'
        ])
      ]),
      v('div', { key: 'root', styles: { height: 'calc(100% - 20px)' }}, [
        v('div', { key: 'top', styles: {
          height: isSmall ? '100%' : '60%',
          display: 'flex',
          border: '1px solid black'
        } }, [
          v('div', { key: 'left', classes: css.demoSection, styles: {
            width: isSmall ? '100%' : '50%'
          } }, [
            widgets[(4 - this._offset) % 4]
          ]),
          isSmall ? null : v('div', { key: 'middle', classes: css.demoSection, styles: {
            width: '30%'
          }}, [
            widgets[(5 - this._offset) % 4]
          ]),
          isSmall ? null : v('div', { key: 'right', classes: css.demoSection, styles: {
            width: '20%'
          } }, [
            widgets[(6 - this._offset) % 4]
          ])
        ]),
        isSmall ? null : v('div', { key: 'bottom' }, [
          widgets[(7 - this._offset) % 4]
        ])
      ])
    ]);
	}
}

export default App;
