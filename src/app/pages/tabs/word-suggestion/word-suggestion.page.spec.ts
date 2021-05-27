import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WordSuggestionPage } from './word-suggestion.page';

describe('WordSuggestionPage', () => {
  let component: WordSuggestionPage;
  let fixture: ComponentFixture<WordSuggestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordSuggestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WordSuggestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
